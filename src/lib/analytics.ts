// Google Analytics 4 helpers (gtag is loaded in index.html)
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_ID = "G-9Y3NW89YCT";

function send(event: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", event, params);
  // GTM dataLayer fallback
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export const analytics = {
  pageView(path: string, title?: string) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("config", GA_ID, { page_path: path, page_title: title });
    send("page_view", { page_path: path, page_title: title });
  },
  viewContent(itemId: string, itemName: string, value = 29.9) {
    send("view_content", {
      currency: "BRL",
      value,
      items: [{ item_id: itemId, item_name: itemName, price: value }],
    });
  },
  beginCheckout(planId: string, planName: string, value = 29.9) {
    send("begin_checkout", {
      currency: "BRL",
      value,
      items: [{ item_id: planId, item_name: planName, price: value }],
    });
  },
  generatePix(value = 29.9, transactionId?: string) {
    send("generate_pix", { currency: "BRL", value, transaction_id: transactionId });
  },
  purchase(value = 29.9, transactionId?: string) {
    send("purchase", { currency: "BRL", value, transaction_id: transactionId });
  },
};
