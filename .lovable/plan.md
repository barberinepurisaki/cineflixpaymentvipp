# Otimização de Conversão — CINEFLIXPAYMENT

Vou dividir em 4 entregas. Antes de começar, preciso confirmar pontos críticos abaixo.

## Entrega 1 — Remover fricção inicial e nova primeira dobra
- **HumanGate**: remover o bloqueio "Não sou um robô" do carregamento inicial. Mantê-lo apenas como challenge condicional:
  - 3+ tentativas de submit em <10s
  - Antes do clique "Assinar/Checkout"
  - Comportamento sem movimento de mouse + submit rápido (heurística simples)
- **HeroSection** reescrito com a nova copy:
  - H1: "Filmes, séries, futebol e canais ao vivo por um valor que cabe no seu bolso."
  - Subtítulo curto + 4 benefícios (🎬 ⚽ 📺 ✨)
  - Badges de compatibilidade (Smart TV, TV Box, Celular, PC)
  - Preço inicial "A partir de R$ 29,90"
  - CTA primário: "Começar agora" → rola para planos
  - Mini prova social (avaliação + nº clientes + selo 24h)
- **Storytelling "Seu João"** numa seção logo abaixo da dobra (mantém autenticidade da copy enviada).

## Entrega 2 — Planos + Prova Social reforçada
- **PlansSection**: garantir 3 planos visíveis (Mensal, Trimestral, Anual destacado "Mais vantajoso") com valor, economia %, benefícios e selo de garantia. Já existem planos — confirmar valores abaixo.
- **SocialProof**: adicionar contador de clientes ativos, estrelas, 3 depoimentos curtos e selo "Suporte 24h".

## Entrega 3 — Analytics GA4 completo + Webhook Cakto
GA4 (`G-9Y3NW89YCT`) já instalado. Vou garantir disparo de:
- `page_view` (já existe via RouteTracker)
- `view_content` ao abrir modal de filme/plano
- `begin_checkout` no clique "Assinar" (valor + moeda + plano)
- `generate_pix` quando Cakto retornar PIX
- `purchase` no webhook confirmando pagamento (server-side via Measurement Protocol)

Webhook `/api/cakto/webhook` (já existe edge function `cakto-webhook` + redirect Netlify). Vou:
- Processar status: `pix_generated`, `paid`, `refused`, `refunded`
- Salvar em `cakto_sales` (já existe): nome, email, telefone, valor, status, data, transaction_id
- Enviar `purchase` ao GA4 via Measurement Protocol quando `paid`

## Entrega 4 — Dashboard de conversão (admin)
Nova aba em `/admin` "Funil de Conversão":
- Visitantes → Checkout → PIX gerado → PIX pago (gráfico funil)
- Cards: taxa conversão, faturamento, PIX abandonados, aprovados, recusados, reembolsos
- Filtro por mês (igual ao de comprovantes)
- Fonte de dados:
  - Visitantes/checkout: tabela nova `funnel_events` (page_view, begin_checkout) populada pelo client
  - PIX/pagos/recusados: `cakto_sales` por status

## Performance
- Lazy-load das seções TMDB e galerias pesadas
- Converter hero image para WebP + `fetchpriority="high"`
- Remover scripts não usados na primeira dobra

## Detalhes técnicos
- Nova migração: tabela `funnel_events (event_name, session_id, value, plan_id, created_at)` + GRANTs + RLS (insert anônimo, select só admin via `has_role`)
- Edge function `cakto-webhook` ganha envio Measurement Protocol (precisa do secret `GA4_API_SECRET`)
- HumanGate vira componente condicional controlado por hook `useBotChallenge()`

## Perguntas antes de implementar
1. **Valores dos planos**: Mensal R$29,90; Trimestral e Anual — quais valores e % de desconto devo usar?
2. **Prova social**: posso usar números plausíveis ("+12.000 clientes ativos", "4.8★ com 2.300 avaliações") como placeholder, ou você me passa os reais? (memória proíbe métricas falsas — preciso de números reais ou aprovação explícita)
3. **GA4 Measurement Protocol API Secret**: para disparar `purchase` server-side preciso desse secret (criado em GA4 → Admin → Data Streams → Measurement Protocol API secrets). Você consegue gerar?
4. **Depoimentos**: tem 3 depoimentos reais de clientes ou crio textos genéricos sem nome/foto?