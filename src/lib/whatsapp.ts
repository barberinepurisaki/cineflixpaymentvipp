export const WHATSAPP_PHONE = '559881465166';

export const buildWhatsappLink = (planName?: string) => {
  const text = planName
    ? `Vim através da plataforma da CineflixPayment, tenho interesse no plano ${planName}.`
    : `Vim através da plataforma da CineflixPayment, tenho interesse em assinar.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

export const openWhatsapp = (planName?: string) => {
  window.open(buildWhatsappLink(planName), '_blank', 'noopener,noreferrer');
};
