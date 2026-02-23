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
          <p>Ao acessar e utilizar a plataforma CINEFLIXPAYMENT, você concorda com estes Termos de Uso. Caso não concorde, por favor, não utilize nossos serviços. O uso continuado da plataforma constitui aceitação plena de todas as condições aqui descritas.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Descrição dos Serviços</h2>
          <p>A CINEFLIXPAYMENT oferece acesso a conteúdo de entretenimento digital, incluindo filmes, séries, animes, K-dramas e eventos esportivos ao vivo, mediante assinatura paga. O acesso ao conteúdo é exclusivamente digital e pessoal, sendo vedada a reprodução, distribuição ou compartilhamento não autorizado.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Cadastro e Conta</h2>
          <p>Para acessar nossos serviços, é necessário criar uma conta fornecendo informações verídicas e atualizadas. Você é responsável por manter a confidencialidade de suas credenciais de acesso. Cada conta é pessoal e intransferível. A CINEFLIXPAYMENT reserva-se o direito de suspender contas que violem estes termos.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Planos e Pagamentos</h2>
          <p>Oferecemos planos de assinatura com diferentes períodos (mensal, trimestral e anual), além do APK Vitalício. Os valores estão sujeitos a alterações com aviso prévio de 30 dias. O pagamento é processado através de plataformas seguras (Kirvano e Cakto). A renovação automática ocorre ao final de cada período de assinatura, exceto para o plano APK Vitalício.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Cancelamento e Reembolso</h2>
          <p>Você pode cancelar sua assinatura a qualquer momento. O acesso permanece ativo até o final do período pago. O APK Vitalício possui garantia de 360 dias — caso não fique satisfeito, solicite o reembolso dentro deste prazo através do nosso suporte.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Uso Aceitável</h2>
          <p>É proibido: (a) compartilhar credenciais com terceiros; (b) utilizar VPN ou métodos para burlar restrições geográficas; (c) tentar copiar, gravar ou redistribuir o conteúdo; (d) realizar engenharia reversa dos aplicativos; (e) utilizar a plataforma para fins ilegais.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Propriedade Intelectual</h2>
          <p>Todo o conteúdo disponibilizado na plataforma, incluindo logotipos, design, textos e material audiovisual, é protegido por direitos autorais. O uso do conteúdo é limitado à visualização pessoal durante a vigência da assinatura.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Limitação de Responsabilidade</h2>
          <p>A CINEFLIXPAYMENT não se responsabiliza por: interrupções temporárias do serviço; alterações no catálogo de conteúdo; problemas de conexão do usuário; uso indevido da conta por terceiros devido à negligência do titular.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Modificações</h2>
          <p>Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas por e-mail ou notificação na plataforma com antecedência mínima de 15 dias.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">10. Contato</h2>
          <p>Para dúvidas sobre estes termos, entre em contato: contato@cineflixpayment.com ou via WhatsApp pelo nosso canal de suporte.</p>
        </section>
      </div>
    </main>
  </div>
);

export default Terms;