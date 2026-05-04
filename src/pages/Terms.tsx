import { Link } from 'react-router-dom';
import cineflixLogo from '@/assets/cineflix-logo.png';

const Terms = () => (
  <div className="min-h-screen bg-cinema-dark text-white">
    <header className="border-b border-white/10 p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <Link to="/">
          <img src={cineflixLogo} alt="CINEFLIXPAYMENT" className="h-8" />
        </Link>
        <Link to="/" className="text-white/60 hover:text-white text-sm">← Voltar</Link>
      </div>
    </header>
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>
      <div className="space-y-6 text-white/80 text-sm leading-relaxed">
        <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Aceitação dos Termos</h2>
          <p>Ao acessar e utilizar a plataforma <strong>CINEFLIXPAYMENT</strong> (nome fantasia), você concorda integralmente com estes Termos de Uso. Caso não concorde com qualquer cláusula, recomendamos não utilizar nossos serviços. O uso continuado constitui aceitação plena de todas as condições aqui descritas.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Descrição dos Serviços</h2>
          <p>A <strong>CINEFLIXPAYMENT</strong> comercializa <strong>licenças de acesso a serviços de IPTV</strong> através de aplicativos compatíveis, incluindo (mas não se limitando a): <strong>XCloud TV, Raiden Play, HD Play, Epic Play e Raizzen Play</strong>. Os aplicativos são compatíveis com <strong>Smart TV, Celular, Notebook e Tablet</strong>, oferecendo acesso a uma ampla grade de canais, filmes, séries e eventos ao vivo.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Teste Gratuito</h2>
          <p>Disponibilizamos um <strong>teste gratuito de 7 horas</strong> para que o usuário possa avaliar a qualidade e estabilidade do serviço antes da contratação. O teste é único por usuário/dispositivo e não gera obrigação de aquisição posterior.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Cadastro e Conta</h2>
          <p>Para liberação do teste ou ativação da licença, o usuário deve fornecer informações verídicas (nome, e-mail e/ou WhatsApp). As credenciais de acesso (usuário e senha do app IPTV) são <strong>pessoais e intransferíveis</strong>. O compartilhamento com terceiros pode resultar em bloqueio imediato sem direito a reembolso.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Planos e Pagamentos</h2>
          <p>Oferecemos planos de licença com diferentes vigências (mensal, trimestral, semestral e anual), além de opções vitalícias quando disponíveis. Os pagamentos são processados por gateways seguros (Kirvano e Cakto) via Pix, cartão de crédito ou boleto. Os valores podem ser reajustados mediante aviso prévio.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Cancelamento e Reembolso</h2>
          <p>O usuário pode interromper o uso a qualquer momento — não há cobrança automática recorrente sem autorização. Solicitações de reembolso seguem o <strong>Código de Defesa do Consumidor (art. 49)</strong>: até 7 dias corridos após a compra, desde que comprovada falha técnica não sanada pelo suporte.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Uso Aceitável</h2>
          <p>É expressamente proibido: (a) revender ou redistribuir as credenciais; (b) utilizar o serviço em estabelecimentos comerciais sem licença específica; (c) tentar engenharia reversa dos aplicativos; (d) utilizar a plataforma para fins ilícitos; (e) utilizar mais dispositivos simultâneos do que o contratado.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Compatibilidade e Requisitos</h2>
          <p>Os aplicativos suportados (XCloud TV, Raiden Play, HD Play, Epic Play, Raizzen Play) funcionam em <strong>Smart TVs (Android TV, LG, Samsung — quando compatíveis)</strong>, <strong>celulares Android e iOS</strong>, <strong>notebooks (Windows/Mac via player compatível)</strong> e <strong>tablets</strong>. É requisito uma conexão de internet estável de no mínimo 15 Mbps para qualidade HD e 35 Mbps para 4K.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Suporte Técnico</h2>
          <p>O suporte é prestado via WhatsApp e e-mail durante a vigência da licença. Não nos responsabilizamos por instabilidades decorrentes da operadora de internet do usuário, falhas de hardware do dispositivo ou bloqueios impostos por terceiros.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">10. Limitação de Responsabilidade</h2>
          <p>A CINEFLIXPAYMENT atua como <strong>revendedora autorizada de licenças de aplicativos IPTV</strong>. Não nos responsabilizamos por: alterações na grade de canais; quedas pontuais dos servidores; problemas decorrentes do uso indevido; bloqueios da operadora de internet do usuário.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">11. Propriedade Intelectual</h2>
          <p>A marca <strong>CINEFLIXPAYMENT</strong> (nome fantasia), seu logotipo, layout e materiais de marketing são protegidos. Os aplicativos XCloud TV, Raiden Play, HD Play, Epic Play e Raizzen Play pertencem aos seus respectivos desenvolvedores.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">12. Modificações</h2>
          <p>Reservamo-nos o direito de alterar estes Termos a qualquer momento. Alterações relevantes serão comunicadas via e-mail ou WhatsApp com antecedência mínima de 15 dias.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">13. Foro e Contato</h2>
          <p>Fica eleito o foro da comarca do consumidor para dirimir eventuais controvérsias. Para dúvidas: <strong>contato@cineflixpayment.com</strong> ou via WhatsApp pelo nosso canal oficial de suporte.</p>
        </section>
      </div>
    </main>
  </div>
);

export default Terms;
