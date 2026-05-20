import { Link } from 'react-router-dom';
import cineflixLogo from '@/assets/cineflix-logo.png';

const Privacy = () => (
  <div className="min-h-screen bg-cinema-dark text-white">
    <header className="border-b border-white/10 p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <Link to="/">
          <img src={cineflixLogo} alt="Logo CineflixPayment" className="h-8" />
        </Link>
        <Link to="/" className="text-white/60 hover:text-white text-sm">← Voltar</Link>
      </div>
    </header>
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
      <div className="space-y-6 text-white/80 text-sm leading-relaxed">
        <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Informações Coletadas</h2>
          <p>Coletamos as seguintes informações: nome completo, endereço de e-mail, dados de pagamento (processados por terceiros — Kirvano e Cakto), endereço IP, dados de navegação e preferências de conteúdo. Não armazenamos dados de cartão de crédito em nossos servidores.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Uso das Informações</h2>
          <p>Utilizamos suas informações para: processar pagamentos e assinaturas; personalizar recomendações de conteúdo; enviar comunicações sobre o serviço; melhorar a experiência do usuário; prevenir fraudes e atividades não autorizadas; cumprir obrigações legais.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Compartilhamento de Dados</h2>
          <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing. Compartilhamos dados apenas com: processadores de pagamento (Kirvano/Cakto) para efetuar transações; prestadores de serviço essenciais ao funcionamento da plataforma; autoridades legais quando exigido por lei.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Segurança dos Dados</h2>
          <p>Empregamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia SSL/TLS, controle de acesso restrito, monitoramento contínuo de segurança e backups regulares. Apesar dessas medidas, nenhum sistema é 100% seguro.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Cookies e Tecnologias</h2>
          <p>Utilizamos cookies e tecnologias similares para: manter sua sessão ativa; lembrar suas preferências; analisar o uso da plataforma; otimizar o desempenho. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do serviço.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Seus Direitos (LGPD)</h2>
          <p>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a: acessar seus dados pessoais; corrigir dados incompletos ou desatualizados; solicitar a exclusão de seus dados; revogar consentimento; solicitar portabilidade dos dados. Para exercer esses direitos, entre em contato pelo e-mail contato@cineflixpayment.com.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Retenção de Dados</h2>
          <p>Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para cumprir obrigações legais. Após o encerramento da conta, seus dados serão excluídos em até 90 dias, exceto quando houver obrigação legal de retenção.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Menores de Idade</h2>
          <p>Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente dados de menores. Caso identifiquemos dados de menores em nossa base, procederemos com a exclusão imediata.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Contato</h2>
          <p>Para questões sobre privacidade: contato@cineflixpayment.com. Encarregado de Proteção de Dados: CINEFLIXPAYMENT — Departamento de Privacidade.</p>
        </section>
      </div>
    </main>
  </div>
);

export default Privacy;