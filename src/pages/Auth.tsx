import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import cineflixLogo from '@/assets/cineflix-logo.png';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Erro ao entrar',
            description: error.message === 'Invalid login credentials' 
              ? 'E-mail ou senha incorretos.' 
              : error.message,
            variant: 'destructive',
          });
        } else {
          navigate('/');
        }
      } else {
        if (!name.trim()) {
          toast({ title: 'Preencha seu nome', variant: 'destructive' });
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name);
        if (error) {
          toast({
            title: 'Erro no cadastro',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: '✅ Cadastro realizado!',
            description: 'Verifique seu e-mail para confirmar a conta.',
          });
          setIsLogin(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cinema-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cinema-red/10 via-cinema-dark to-cinema-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cinema-red/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </button>

        {/* Card */}
        <div className="bg-cinema-panel/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src={cineflixLogo} alt="Logo CineflixPayment" className="h-16 w-auto mb-3" />
            <h1 className="font-cinema text-2xl text-white">
              CINEFLIX<span className="text-cinema-red">PAYMENT</span>
              <span className="sr-only"> — Assinatura de Streaming e IPTV</span>
            </h1>
            <p className="text-white/50 text-sm mt-2">
              {isLogin ? 'Acesse sua conta' : 'Crie sua conta grátis'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 bg-cinema-dark/50 border-white/10 focus:border-cinema-red h-12 text-white"
                  maxLength={50}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 bg-cinema-dark/50 border-white/10 focus:border-cinema-red h-12 text-white"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-11 bg-cinema-dark/50 border-white/10 focus:border-cinema-red h-12 text-white"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-cinema-red hover:bg-cinema-glow text-white font-bold text-lg shadow-glow transition-all duration-300"
            >
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cinema-red hover:text-cinema-glow ml-2 font-semibold transition-colors"
              >
                {isLogin ? 'Criar conta grátis' : 'Entrar'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
