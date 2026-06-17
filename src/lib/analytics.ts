// Google Analytics 4 helpers (gtag is loaded in index.html)
// + persistência de eventos de funil no banco (Supabase) para o dashboard interno
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_ID = "G-9Y3NW89YCT";
const SESSION_KEY = "cineflix_session_id_v1";

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function send(event: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", event, params);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

async function persist(event_name: string, extra: Record<string, any> = {}) {
  try {
    await supabase.from("funnel_events").insert({
      event_name,
      session_id: getSessionId(),
      plan_id: extra.plan_id ?? null,
      plan_name: extra.plan_name ?? null,
      value: extra.value ?? null,
      currency: extra.currency ?? "BRL",
      path: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      metadata: extra.metadata ?? {},
    });
  } catch {
    // silencioso — analytics não pode quebrar UX
  }
}

export const analytics = {
  pageView(path: string, title?: string) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", GA_ID, { page_path: path, page_title: title });
    }
    send("page_view", { page_path: path, page_title: title });
    persist("page_view", { metadata: { title } });
  },
  viewContent(itemId: string, itemName: string, value = 29.9) {
    send("view_content", {
      currency: "BRL",
      value,
      items: [{ item_id: itemId, item_name: itemName, price: value }],
    });
    persist("view_content", { plan_id: itemId, plan_name: itemName, value });
  },
  beginCheckout(planId: string, planName: string, value = 29.9) {
    send("begin_checkout", {
      currency: "BRL",
      value,
      items: [{ item_id: planId, item_name: planName, price: value }],
    });
    persist("begin_checkout", { plan_id: planId, plan_name: planName, value });
  },
  generatePix(value = 29.9, transactionId?: string) {
    send("generate_pix", { currency: "BRL", value, transaction_id: transactionId });
    persist("generate_pix", { value, metadata: { transaction_id: transactionId } });
  },
  purchase(value = 29.9, transactionId?: string) {
    send("purchase", { currency: "BRL", value, transaction_id: transactionId });
    persist("purchase", { value, metadata: { transaction_id: transactionId } });
  },
};
