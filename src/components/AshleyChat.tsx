import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X, Check, Film, Tv, User, UserRound, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage, Plan } from '@/types';
import { plans, upsells } from '@/data/cineflix';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import cineflixLogo from '@/assets/cineflix-logo.png';

interface AshleyChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

type ChatStep =
  | 'greeting'
  | 'name'
  | 'gender'
  | 'recommendations'
  | 'plans'
  | 'upsell'
  | 'checkout'
  | 'freeChat';
type UserGender = 'male' | 'female' | null;

const TYPING_DELAY = 900;
const MESSAGE_INTERVAL = 800;
const MAX_INPUT_LEN = 500;

let __msgSeq = 0;
const uid = () => `m_${Date.now()}_${++__msgSeq}_${Math.random().toString(36).slice(2, 7)}`;

const cleanAIResponse = (text: string): string =>
  (text || '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/^[-•●▪]\s*/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/`{1,3}/g, '')
    .trim();

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const MALE_NAMES = new Set([
  'lucas','joao','joão','pedro','miguel','gabriel','arthur','davi','david','bernardo','heitor','theo','enzo','lorenzo',
  'matheus','mateus','nicolas','samuel','rafael','vitor','victor','leonardo','leo','gustavo','henrique','felipe','filipe',
  'daniel','andre','andré','carlos','paulo','marcos','marcelo','rodrigo','ricardo','eduardo','fernando','bruno','thiago',
  'tiago','alexandre','antonio','antônio','francisco','jose','josé','luiz','luis','luís','sergio','sérgio','jorge','fabio',
  'fábio','diego','douglas','igor','isaac','julio','júlio','mario','mário','otavio','otávio','pablo','renan','vinicius',
  'vinícius','wesley','william','yuri','hugo','ian','juan','kauã','kauan','levi','murilo','ravi','raul','vicente','caio',
  'breno','elias','edson','adriano','alan','alex','cesar','césar','cristiano','danilo','everton','emerson','erick','erik',
  'guilherme','ivan','jefferson','joel','jonas','kaio','leandro','lincoln','lucca','luca','marcio','márcio','marlon',
  'nelson','oscar','patrick','renato','robson','wagner','walter','wellington','iago','flavio','flávio'
]);

const FEMALE_NAMES = new Set([
  'julia','júlia','juliana','maria','ana','sofia','sophia','alice','laura','isabella','isabela','manuela','helena',
  'valentina','lorena','livia','lívia','beatriz','mariana','gabriela','rafaela','larissa','jessica','jéssica','fernanda',
  'camila','amanda','leticia','letícia','vanessa','patricia','patrícia','sandra','claudia','cláudia','monica','mônica',
  'carla','daniela','raquel','renata','debora','débora','eduarda','heloisa','heloísa','joana','lara','luiza','luísa',
  'melissa','nicole','olivia','olívia','sarah','sara','tatiana','yasmin','bianca','bruna','cecilia','cecília','clara',
  'elisa','esther','ester','giovanna','isadora','laís','marcela','marina','milena','paula','priscila','rebeca','simone',
  'stella','vitoria','vitória','viviane','ingrid','kelly','lucia','lúcia','luana','marta','márcia','natalia','natália',
  'natasha','rita','rosa','rosana','sabrina','sheila','silvia','sílvia','talita','tamires','teresa','vera','virginia',
  'aline','andrea','angela','ângela','carolina','carol'
]);

const guessGenderFromName = (name: string): 'male' | 'female' | null => {
  const n = name.trim().toLowerCase();
  if (!n) return null;
  if (MALE_NAMES.has(n)) return 'male';
  if (FEMALE_NAMES.has(n)) return 'female';
  const last = n.slice(-1);
  if (last === 'a' || last === 'á') return 'female';
  if (last === 'o' || last === 'ó') return 'male';
  return null;
};

const AshleyChat = ({ isOpen, onClose, initialMessage }: AshleyChatProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<ChatStep>('greeting');
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState<UserGender>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: string; content: string }>>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageQueueRef = useRef<string[]>([]);
  const processingQueueRef = useRef(false);
  const hasStartedRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const processMessageQueue = useCallback(async () => {
    if (processingQueueRef.current) return;
    processingQueueRef.current = true;
    try {
      while (messageQueueRef.current.length > 0) {
        const content = messageQueueRef.current.shift()!;
        if (!isMountedRef.current) break;
        setIsTyping(true);
        await sleep(TYPING_DELAY);
        if (!isMountedRef.current) break;
        setIsTyping(false);
        const newMessage: ChatMessage = {
          id: uid(),
          content,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
        setConversationHistory((prev) => [...prev, { role: 'assistant', content }]);
        if (messageQueueRef.current.length > 0) await sleep(MESSAGE_INTERVAL);
      }
    } finally {
      processingQueueRef.current = false;
      if (isMountedRef.current) setIsTyping(false);
    }
  }, []);

  const addBotMessage = useCallback(
    (content: string) => {
      if (!content) return;
      messageQueueRef.current.push(content);
      void processMessageQueue();
    },
    [processMessageQueue]
  );

  const waitForQueueIdle = useCallback(async () => {
    let safety = 0;
    while ((processingQueueRef.current || messageQueueRef.current.length > 0) && safety < 200) {
      await sleep(100);
      safety++;
    }
  }, []);

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: uid(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setConversationHistory((prev) => [...prev, { role: 'user', content }]);
  };

  const getAIResponse = async (userMessage: string) => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    try {
      await waitForQueueIdle();
      const { data, error } = await supabase.functions.invoke('ashley-chat', {
        body: { userMessage, userName, userGender, conversationHistory, step },
      });
      if (error) throw error;
      const raw = data?.response || 'Me conta um pouco mais sobre o que você procura?';
      const response = cleanAIResponse(raw) || 'Me conta um pouco mais sobre o que você procura?';
      addBotMessage(response);
    } catch (err) {
      console.error('Ashley AI error:', err);
      addBotMessage('Tive um probleminha rapidinho aqui. Pode repetir sua última mensagem?');
    } finally {
      if (isMountedRef.current) setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const startSequence = async () => {
      await sleep(400);
      if (initialMessage) {
        addBotMessage(initialMessage);
        addBotMessage('Sou Ashley, da CineflixPayment. Me diz seu nome pra eu te atender melhor?');
      } else {
        addBotMessage('Olá! Sou Ashley, da CineflixPayment.');
        addBotMessage('Vou te ajudar a escolher o melhor plano em menos de 1 minuto.');
        addBotMessage('Como posso te chamar?');
      }
      setStep('name');
    };
    void startSequence();
  }, [isOpen, initialMessage, addBotMessage]);

  const isValidName = (text: string): boolean => {
    const t = text.trim();
    if (t.length < 2 || t.length > 25) return false;
    if (/\d|[_@#$%^&*+=<>/\\|{}[\]~`]/.test(t)) return false;
    const bad = ['bot', 'robô', 'robo', 'teste', 'test', 'admin', 'null', 'undefined'];
    return !bad.includes(t.toLowerCase());
  };

  const extractName = (text: string): string | null => {
    const patterns = [
      /(?:me\s+chamo|meu\s+nome\s+[eé]|sou\s+[oa]?\s*|chamo\s*[-–]?\s*me)\s+([A-Za-zÀ-ÿ]+)/i,
      /(?:pode\s+me\s+chamar\s+de|meu\s+nome\s*[eé:]\s*)([A-Za-zÀ-ÿ]+)/i,
      /^([A-Za-zÀ-ÿ]{2,20})$/i,
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const potentialName = match[1].trim();
        if (isValidName(potentialName)) {
          return potentialName.charAt(0).toUpperCase() + potentialName.slice(1).toLowerCase();
        }
      }
    }
    return null;
  };

  const showGenderRecommendations = async (gender: 'male' | 'female') => {
    setStep('recommendations');
    const intro =
      gender === 'male'
        ? `Show, ${userName}. Separei o catálogo ideal pra você:`
        : `Perfeito, ${userName}. Preparei o conteúdo ideal pra você:`;
    addBotMessage(intro);
    const recs =
      gender === 'male'
        ? 'Ação, futebol ao vivo com Champions e Libertadores, super-heróis Marvel e DC, e sagas completas em 4K.'
        : 'K-Dramas mais assistidos, séries românticas, reality shows, novelas turcas e muito mais.';
    addBotMessage(recs);
    addBotMessage('E tem muito além disso. Escolha seu plano abaixo pra liberar tudo:');
    setStep('plans');
  };

  const handleSend = async () => {
    const raw = input.trim();
    if (!raw || isAiLoading) return;
    const text = raw.slice(0, MAX_INPUT_LEN);
    setInput('');
    addUserMessage(text);

    if (step === 'name') {
      let extractedName = extractName(text);
      if (!extractedName && isValidName(text)) {
        extractedName = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      }
      if (extractedName) {
        setUserName(extractedName);
        const guessed = guessGenderFromName(extractedName);
        addBotMessage(`Prazer em te conhecer, ${extractedName}.`);
        if (guessed) {
          setUserGender(guessed);
          await showGenderRecommendations(guessed);
        } else {
          addBotMessage('Você prefere conteúdo mais masculino ou feminino? Assim eu recomendo melhor.');
          setStep('gender');
        }
      } else {
        addBotMessage('Não peguei seu nome. Pode me dizer só seu primeiro nome?');
      }
      return;
    }

    if (step === 'gender') {
      const lower = text.toLowerCase();
      const isMale = /\b(homem|masculino|ele|cara|boy|man|menino|garoto)\b/i.test(lower);
      const isFemale = /\b(mulher|feminino|ela|mina|girl|woman|menina|garota)\b/i.test(lower);
      if (isMale) {
        setUserGender('male');
        await showGenderRecommendations('male');
      } else if (isFemale) {
        setUserGender('female');
        await showGenderRecommendations('female');
      } else {
        addBotMessage('Me diz: homem ou mulher?');
      }
      return;
    }

    await getAIResponse(text);
  };

  const handleSelectGender = (gender: 'male' | 'female') => {
    if (isAiLoading || isTyping) return;
    setUserGender(gender);
    addUserMessage(gender === 'male' ? 'Sou homem' : 'Sou mulher');
    void showGenderRecommendations(gender);
  };

  const handleSelectPlan = (plan: Plan) => {
    if (isAiLoading) return;
    setSelectedPlan(plan);
    addUserMessage(`Quero o ${plan.name}`);
    addBotMessage(`Excelente escolha, ${userName || 'cliente'}. ${plan.name} é a pedida certa.`);
    addBotMessage('Quer turbinar sua experiência com algum adicional? (opcional)');
    setStep('upsell');
  };

  const toggleUpsell = (upsellId: string) => {
    setSelectedUpsells((prev) =>
      prev.includes(upsellId) ? prev.filter((id) => id !== upsellId) : [...prev, upsellId]
    );
  };

  const calculateTotal = (): number => {
    let total = selectedPlan?.price || 0;
    selectedUpsells.forEach((id) => {
      const upsell = upsells.find((u) => u.id === id);
      if (upsell) total += upsell.price;
    });
    return total;
  };

  const handleConfirmUpsells = () => {
    if (!selectedPlan) return;
    setStep('checkout');
    const upsellParam = selectedUpsells.length > 0 ? `&upsells=${selectedUpsells.join(',')}` : '';
    const nomeParam = encodeURIComponent(userName || 'Cliente');
    const url = `/comprovante?plano=${selectedPlan.id}&nome=${nomeParam}${upsellParam}`;
    addBotMessage(`Perfeito, ${userName || 'cliente'}. Gerando seu comprovante oficial...`);
    setTimeout(() => {
      navigate(url);
      onClose();
    }, 1400);
  };

  if (!isOpen) return null;

  const canType =
    step === 'name' ||
    step === 'gender' ||
    step === 'freeChat' ||
    step === 'plans' ||
    step === 'recommendations';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full sm:max-w-md h-[100dvh] sm:h-[80dvh] sm:max-h-[640px] bg-gradient-to-b from-cinema-panel to-cinema-dark sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/5 animate-scale-in text-[14px] leading-normal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — compacto */}
        <div className="bg-gradient-to-r from-cinema-red to-cinema-glow px-3 py-2.5 flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center overflow-hidden shrink-0">
            <img src={cineflixLogo} alt="CineflixPayment" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-[14px] leading-tight truncate">CineflixPayment</h3>
            <p className="text-white/85 text-[11px] flex items-center gap-1.5 leading-tight">
              Ashley — atendimento
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar chat"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'max-w-[85%] px-3 py-2 rounded-2xl text-[14px] leading-snug whitespace-pre-wrap break-words animate-fade-in',
                msg.sender === 'bot'
                  ? 'bg-cinema-panel text-white rounded-bl-sm'
                  : 'bg-cinema-red text-white ml-auto rounded-br-sm'
              )}
            >
              {msg.content}
            </div>
          ))}

          {/* Gender selection */}
          {step === 'gender' && !isTyping && (
            <div className="flex gap-2 pt-1 animate-slide-up">
              <button
                onClick={() => handleSelectGender('male')}
                className="flex-1 py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cinema-red/60 transition-all flex flex-col items-center gap-1.5"
              >
                <User className="w-5 h-5 text-white/90" />
                <span className="text-[13px] font-medium text-white">Sou homem</span>
              </button>
              <button
                onClick={() => handleSelectGender('female')}
                className="flex-1 py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cinema-red/60 transition-all flex flex-col items-center gap-1.5"
              >
                <UserRound className="w-5 h-5 text-white/90" />
                <span className="text-[13px] font-medium text-white">Sou mulher</span>
              </button>
            </div>
          )}

          {/* Plan cards — compactos */}
          {step === 'plans' && !selectedPlan && !isTyping && (
            <div className="space-y-2 pt-1 animate-slide-up">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={cn(
                    'w-full text-left p-3 rounded-xl border transition-all',
                    plan.featured
                      ? 'bg-cinema-red/10 border-cinema-red/60 hover:bg-cinema-red/15'
                      : 'bg-white/5 border-white/10 hover:border-white/25'
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {plan.featured ? (
                        <Sparkles className="w-4 h-4 text-cinema-red" />
                      ) : (
                        <Tv className="w-4 h-4 text-white/70" />
                      )}
                      <span className="font-semibold text-white text-[13.5px]">{plan.name}</span>
                    </div>
                    {plan.discount && (
                      <span className="text-[10px] font-bold text-cinema-red bg-cinema-red/15 px-1.5 py-0.5 rounded uppercase tracking-wide">
                        {plan.discount}
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-bold text-white mb-1.5">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                    <span className="text-[11px] text-white/60 font-normal ml-1">{plan.period}</span>
                  </div>
                  <ul className="text-[12px] text-white/70 space-y-1">
                    {plan.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-cinema-red mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          )}

          {/* Upsell selection */}
          {step === 'upsell' && !isTyping && (
            <div className="space-y-2 pt-1 animate-slide-up">
              {upsells.map((upsell) => {
                const isSelected = selectedUpsells.includes(upsell.id);
                return (
                  <button
                    key={upsell.id}
                    type="button"
                    onClick={() => toggleUpsell(upsell.id)}
                    className={cn(
                      'w-full flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left',
                      isSelected
                        ? 'bg-cinema-red/10 border-cinema-red/60'
                        : 'bg-white/5 border-white/10 hover:border-white/25'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0',
                        isSelected ? 'bg-cinema-red border-cinema-red' : 'border-white/30'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-[13px] leading-tight">{upsell.name}</div>
                      <div className="text-[11px] text-white/60 leading-tight mt-0.5">{upsell.description}</div>
                    </div>
                    <span className="text-white font-bold text-[13px] shrink-0">
                      + R$ {upsell.price.toFixed(2).replace('.', ',')}
                    </span>
                  </button>
                );
              })}

              <div className="pt-2 mt-1 border-t border-white/10">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-white/60 text-[12px]">Total</span>
                  <span className="text-lg font-bold text-white">
                    R$ {calculateTotal().toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <Button variant="cinema" size="sm" className="w-full h-10 text-[13px]" onClick={handleConfirmUpsells}>
                  <Film className="w-4 h-4 mr-1.5" />
                  Continuar para o comprovante
                </Button>
                <button
                  onClick={handleConfirmUpsells}
                  className="w-full text-center text-[11px] text-white/50 hover:text-white/80 mt-2 underline underline-offset-2"
                >
                  Continuar sem adicionais
                </button>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {(isTyping || isAiLoading) && (
            <div className="max-w-[70%] px-3 py-2.5 rounded-2xl bg-cinema-panel rounded-bl-sm">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-white/50 text-[11px] ml-1">Ashley está escrevendo</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {canType && (
          <div className="p-2.5 border-t border-white/5 bg-black/40 shrink-0">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LEN))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void handleSend();
                  }
                }}
                placeholder={
                  step === 'name'
                    ? 'Seu primeiro nome'
                    : step === 'gender'
                    ? 'Homem ou mulher?'
                    : 'Digite sua mensagem'
                }
                className="flex-1 h-10 text-[13px] bg-cinema-dark border-white/10 focus:border-cinema-red"
                maxLength={MAX_INPUT_LEN}
                disabled={isTyping || isAiLoading}
              />
              <Button
                variant="cinema"
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={() => void handleSend()}
                disabled={isTyping || isAiLoading || !input.trim()}
                aria-label="Enviar mensagem"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AshleyChat;
