import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Plus,
  Store,
  Building2,
  ArrowRight,
  Search,
  Check,
  ShieldCheck,
  Clock3,
  Sparkles,
  LockKeyhole,
  MessageCircle,
  KeyRound,
} from "lucide-react";
import { RETAIL_PRODUCTS, WHOLESALE_PRODUCTS, CATEGORY_ORDER } from "./products";
import type { Product } from "./products";
import { useCart, getQuantityRules, formatQty, formatZAR } from "./CartContext";

type OrderMode = "retail" | "wholesale";

const CATEGORY_VISUALS: Record<
  string,
  { image?: string; tagline: string; objectPosition?: string }
> = {
  Beef: {
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2069&auto=format&fit=crop",
    tagline: "Premium cuts, aged and butchered in-store.",
    objectPosition: "center 40%",
  },
  Lamb: {
    image:
      "https://www.shutterstock.com/image-photo/panorama-banner-grilled-lamb-chops-260nw-1145167235.jpg",
    tagline: "Free-range, tender and full of flavour.",
    objectPosition: "center 50%",
  },
  Chicken: {
    image:
      "https://t4.ftcdn.net/jpg/02/87/89/95/360_F_287899521_Kb6lPD0Ezo14l1YvkINUcJtGuj7XxBI7.jpg",
    tagline: "Whole birds, fillets, wings and braai cuts.",
    objectPosition: "center 52%",
  },
  "Ready to Cook": {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    tagline: "Marinated, seasoned and ready for the fire.",
    objectPosition: "center 40%",
  },
  Ostrich: {
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    tagline: "Lean, distinctive and proudly South African.",
    objectPosition: "center 40%",
  },
  Fish: {
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?q=80&w=2035&auto=format&fit=crop",
    tagline: "Fresh catches, sourced and ready to cook.",
    objectPosition: "center 62%",
  },
  "Cheese & Pantry": {
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
    tagline: "Artisan selections and essential pantry lines.",
    objectPosition: "center 55%",
  },
  "Budget Items": {
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop",
    tagline: "Quality cuts, exceptional value.",
    objectPosition: "center 40%",
  },
  Minces: {
    image:
      "https://www.shutterstock.com/image-photo/raw-minced-meat-spices-vegetables-260nw-1947346570.jpg",
    tagline: "Steak-quality mince, vacuum packed and consistent.",
    objectPosition: "center 50%",
  },
  Cheese: {
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
    tagline: "Artisan and bulk cheese for the trade.",
    objectPosition: "center 55%",
  },
  "Bulk & Pantry": {
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/030/353/445/small/french-fries-background-ai-generated-photo.jpg",
    tagline: "Large-format pantry lines built for the trade.",
    objectPosition: "center 52%",
  },
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  Ostrich: "linear-gradient(135deg, #12253d 0%, #0c0a09 100%)",
  Fish: "linear-gradient(135deg, #0c2430 0%, #0c0a09 100%)",
  "Cheese & Pantry": "linear-gradient(135deg, #1d1a12 0%, #0c0a09 100%)",
  "Budget Items": "linear-gradient(135deg, #151821 0%, #0c0a09 100%)",
  Minces: "linear-gradient(135deg, #10233f 0%, #0c0a09 100%)",
  Cheese: "linear-gradient(135deg, #1d1a12 0%, #0c0a09 100%)",
  "Bulk & Pantry": "linear-gradient(135deg, #13202b 0%, #0c0a09 100%)",
};

const ORDER_MODES: Array<{
  key: OrderMode;
  icon: React.ReactNode;
  kicker: string;
  title: string;
  desc: string;
  image: string;
  bullets: string[];
}> = [
  {
    key: "retail",
    icon: <Store className="w-6 h-6 text-burgundy-300" />,
    kicker: "For home cooks and braais",
    title: "Retail Counter",
    desc:
      "Browse the daily counter for family dinners, braai staples and made-to-order cuts prepared with the same care as in store.",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1800&auto=format&fit=crop",
    bullets: ["Daily cuts", "Family sizing", "Butcher-packed"],
  },
  {
    key: "wholesale",
    icon: <Building2 className="w-6 h-6 text-burgundy-300" />,
    kicker: "For trade, kitchens and resellers",
    title: "Wholesale Desk",
    desc:
      "Move straight into trade packs, bulk formats and dependable repeat ordering with team confirmation before fulfilment.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1800&auto=format&fit=crop",
    bullets: ["Bulk formats", "Consistent pricing", "Trade-ready"],
  },
];

const SERVICE_POINTS = [
  {
    icon: <ShieldCheck size={15} />,
    title: "Butcher-confirmed",
    text: "Every order is reviewed by the team before collection or delivery.",
  },
  {
    icon: <Clock3 size={15} />,
    title: "Freshly prepared",
    text: "Cuts, mince and marinated products are packed with order timing in mind.",
  },
  {
    icon: <Sparkles size={15} />,
    title: "Counter quality",
    text: "The online store mirrors the premium in-store approach, not a generic catalogue.",
  },
];

const RETAIL_SIGNALS = ["Premium cuts", "Braai-ready packs", "Same-day collection"];
const WHOLESALE_SIGNALS = ["Trade packs", "Bulk pricing", "Repeat ordering"];
const WHOLESALE_ACCESS_CODE = "2002";
const WHOLESALE_ACCESS_STORAGE = "coleridge-wholesale-access-v1";
const STEFAN_WHATSAPP_NUMBER = "27611275756";

const getStoredWholesaleAccess = () => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(WHOLESALE_ACCESS_STORAGE) === "granted";
  } catch {
    return false;
  }
};

const setStoredWholesaleAccess = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WHOLESALE_ACCESS_STORAGE, "granted");
  } catch {}
};

const scrollToShopGrid = () => {
  window.setTimeout(() => {
    document.getElementById("shop-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
};

const getOrderMeta = (product: Product) => {
  const rules = getQuantityRules(product);

  if (rules.maxQty != null) {
    return `${formatQty(rules.minQty, product.unit)}-${formatQty(rules.maxQty, product.unit)}`;
  }
  if (rules.minQty > (product.unit === "kg" ? 0.1 : 1)) {
    return `Min ${formatQty(rules.minQty, product.unit)}`;
  }
  return product.unit === "kg" ? `Steps of ${formatQty(rules.step, product.unit)}` : "Sold per item";
};

const getFulfilmentTag = (product: Product) => {
  const note = product.note?.toLowerCase() ?? "";
  if (note.includes("made on order")) return "Made to order";
  if (note.includes("in stock")) return "In stock";
  if (note.includes("vacuum")) return "Vac packed";
  return "Fresh counter";
};

const getProductBlurb = (product: Product) =>
  product.note ?? "Prepared with the same premium counter standard as in store.";

export const ShopSwitch: React.FC = () => {
  const { orderType, setOrderType } = useCart();
  const [isWholesaleUnlocked, setWholesaleUnlocked] = useState(false);
  const [showWholesaleAccess, setShowWholesaleAccess] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestDetails, setRequestDetails] = useState({
    fullName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    orderNotes: "",
  });

  useEffect(() => {
    setWholesaleUnlocked(getStoredWholesaleAccess());
  }, []);

  useEffect(() => {
    if (!isWholesaleUnlocked && orderType === "wholesale") {
      setOrderType("retail");
    }
  }, [isWholesaleUnlocked, orderType, setOrderType]);

  useEffect(() => {
    if (!showWholesaleAccess) {
      setAccessCode("");
      setAccessError("");
      setRequestSent(false);
    }
  }, [showWholesaleAccess]);

  const openWholesaleAccess = () => {
    setShowWholesaleAccess(true);
    setAccessError("");
    setRequestSent(false);
  };

  const handleWholesaleRequestChange =
    (field: keyof typeof requestDetails) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRequestDetails((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleWholesaleCardClick = () => {
    if (isWholesaleUnlocked) {
      setOrderType("wholesale");
      scrollToShopGrid();
      return;
    }

    openWholesaleAccess();
  };

  const handleWholesaleCodeSubmit = () => {
    if (accessCode.trim() !== WHOLESALE_ACCESS_CODE) {
      setAccessError("That code is incorrect. Please request access from Stefan if you do not have the wholesale code yet.");
      return;
    }

    setStoredWholesaleAccess();
    setWholesaleUnlocked(true);
    setShowWholesaleAccess(false);
    setAccessCode("");
    setAccessError("");
    setOrderType("wholesale");
    scrollToShopGrid();
  };

  const handleWholesaleRequest = () => {
    if (
      !requestDetails.fullName.trim() ||
      !requestDetails.companyName.trim() ||
      !requestDetails.phoneNumber.trim()
    ) {
      setAccessError("Please add your name, company name and phone number so Stefan has what he needs to approve access.");
      return;
    }

    const message = [
      "Hi Stefan, I would like wholesale access for the Coleridge Meat website.",
      "",
      `Name: ${requestDetails.fullName.trim()}`,
      `Company: ${requestDetails.companyName.trim()}`,
      `Phone: ${requestDetails.phoneNumber.trim()}`,
      `Email: ${requestDetails.email.trim() || "Not provided"}`,
      `Business details: ${requestDetails.orderNotes.trim() || "Not provided"}`,
      "",
      "Please send me the wholesale access code when approved.",
    ].join("\n");

    const url = `https://wa.me/${STEFAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setAccessError("");
    setRequestSent(true);
  };

  return (
    <>
      <section
        id="shop"
        className="relative overflow-hidden border-y border-stone-900 bg-stone-950 py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(36,83,136,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/6" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-burgundy-700/40 bg-burgundy-900/35 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-burgundy-300">
                Online Counter
              </div>
              <h2 className="max-w-3xl text-4xl font-serif leading-tight text-stone-100 md:text-6xl">
                Choose the counter that fits your order
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-stone-400 md:text-lg">
                Shop retail for family meals and braais, or request wholesale access for larger
                service orders and resale buying. Every order is still confirmed by our team before
                anything is final.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {(orderType === "retail" ? RETAIL_SIGNALS : WHOLESALE_SIGNALS).map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-stone-800 bg-stone-900/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-300"
                  >
                    {signal}
                  </span>
                ))}
                {!isWholesaleUnlocked && (
                  <span className="rounded-full border border-burgundy-800/50 bg-burgundy-900/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-burgundy-200">
                    Wholesale locked
                  </span>
                )}
                {isWholesaleUnlocked && (
                  <span className="rounded-full border border-emerald-800/50 bg-emerald-900/25 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-200">
                    Wholesale approved
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-3 rounded-[28px] border border-stone-800/80 bg-stone-950/70 p-4 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.85)] backdrop-blur-sm">
              {SERVICE_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="flex items-start gap-3 rounded-[20px] border border-stone-800/70 bg-white/[0.02] px-4 py-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-burgundy-700/40 bg-burgundy-900/30 text-burgundy-300">
                    {point.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-200">
                      {point.title}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-stone-400">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {ORDER_MODES.map((mode) => {
              const isWholesaleMode = mode.key === "wholesale";
              const active = orderType === mode.key;
              const isLocked = isWholesaleMode && !isWholesaleUnlocked;

              return (
                <motion.button
                  key={mode.key}
                  type="button"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    if (isWholesaleMode) {
                      handleWholesaleCardClick();
                      return;
                    }

                    setOrderType(mode.key);
                    scrollToShopGrid();
                  }}
                  className={`group relative min-h-[370px] overflow-hidden rounded-[32px] border text-left transition-all duration-500 ${
                    active
                      ? "border-burgundy-600/70 shadow-[0_28px_80px_-34px_rgba(16,35,63,0.8)]"
                      : "border-stone-800/90 hover:border-burgundy-700/45"
                  }`}
                >
                  <img
                    src={mode.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-950/92 via-stone-950/68 to-stone-950/20" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(36,83,136,0.35),transparent_32%)] opacity-80" />
                  {isLocked && <div className="absolute inset-0 bg-stone-950/35 backdrop-blur-[2px]" />}

                  <div className="relative flex h-full flex-col justify-between p-7 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy-700/40 bg-stone-950/75 backdrop-blur-sm">
                        {mode.icon}
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] ${
                          active
                            ? "bg-burgundy-500 text-stone-950"
                            : isWholesaleMode && isWholesaleUnlocked
                              ? "border border-emerald-700/60 bg-emerald-950/30 text-emerald-200"
                            : isLocked
                              ? "border border-burgundy-700/60 bg-stone-950/80 text-burgundy-200"
                              : "border border-stone-700/70 bg-stone-950/70 text-stone-300"
                        }`}
                      >
                        {active
                          ? "Selected"
                          : isWholesaleMode && isWholesaleUnlocked
                            ? "Approved access"
                            : isLocked
                              ? "Code required"
                              : "Choose"}
                      </span>
                    </div>

                    <div className="mt-12 max-w-lg">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-burgundy-300">
                        {mode.kicker}
                      </div>
                      <h3 className="mt-4 text-3xl font-serif text-stone-100 md:text-4xl">
                        {mode.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-7 text-stone-300 md:text-base">
                        {mode.desc}
                      </p>
                      {isLocked && (
                        <p className="mt-4 max-w-md text-xs leading-6 uppercase tracking-[0.18em] text-stone-400">
                          Wholesale pricing is protected. Request access from Stefan to receive
                          your code.
                        </p>
                      )}
                      {isWholesaleMode && isWholesaleUnlocked && (
                        <p className="mt-4 max-w-md text-xs leading-6 uppercase tracking-[0.18em] text-emerald-200">
                          Access approved on this device. Enter the wholesale counter at any time.
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {mode.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="rounded-full border border-white/10 bg-stone-950/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-300 backdrop-blur-sm"
                        >
                          {bullet}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-100">
                        {isLocked ? "Request access" : "Enter mode"} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showWholesaleAccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-stone-950/80 px-4 py-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-stone-800 bg-stone-950 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]"
            >
              <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
                <div className="border-b border-stone-800 bg-[linear-gradient(180deg,rgba(16,35,63,0.4),rgba(12,10,9,0.96))] p-8 lg:border-b-0 lg:border-r">
                  <div className="inline-flex items-center gap-2 rounded-full border border-burgundy-700/40 bg-burgundy-900/35 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-burgundy-200">
                    <LockKeyhole size={14} />
                    Wholesale access
                  </div>
                  <h3 className="mt-6 text-4xl font-serif text-stone-100">
                    Request your wholesale code
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-stone-300">
                    Wholesale pricing is reserved for restaurants, resellers and larger-format
                    buying. Send your details straight to Stefan on WhatsApp and he can approve
                    access and share your code.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-burgundy-300">
                        What to include
                      </div>
                      <p className="mt-2 text-sm leading-6 text-stone-400">
                        Your name, company, phone number and a short note about what you plan to
                        buy helps Stefan review the request quickly.
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-burgundy-300">
                        Already approved?
                      </div>
                      <p className="mt-2 text-sm leading-6 text-stone-400">
                        Enter your access code on the right and the wholesale counter will unlock
                        immediately on this device.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                        Access form
                      </p>
                      <h4 className="mt-2 text-2xl font-serif text-stone-100">
                        Send your details to Stefan
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowWholesaleAccess(false)}
                      className="rounded-full border border-stone-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input
                      value={requestDetails.fullName}
                      onChange={handleWholesaleRequestChange("fullName")}
                      placeholder="Full name"
                      className="rounded-[18px] border border-stone-800 bg-stone-900/80 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-burgundy-700 focus:outline-none"
                    />
                    <input
                      value={requestDetails.companyName}
                      onChange={handleWholesaleRequestChange("companyName")}
                      placeholder="Company name"
                      className="rounded-[18px] border border-stone-800 bg-stone-900/80 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-burgundy-700 focus:outline-none"
                    />
                    <input
                      value={requestDetails.phoneNumber}
                      onChange={handleWholesaleRequestChange("phoneNumber")}
                      placeholder="Phone number"
                      className="rounded-[18px] border border-stone-800 bg-stone-900/80 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-burgundy-700 focus:outline-none"
                    />
                    <input
                      value={requestDetails.email}
                      onChange={handleWholesaleRequestChange("email")}
                      placeholder="Email address"
                      className="rounded-[18px] border border-stone-800 bg-stone-900/80 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-burgundy-700 focus:outline-none"
                    />
                  </div>

                  <textarea
                    value={requestDetails.orderNotes}
                    onChange={handleWholesaleRequestChange("orderNotes")}
                    placeholder="What kind of wholesale products or quantities are you looking for?"
                    rows={4}
                    className="mt-4 w-full rounded-[18px] border border-stone-800 bg-stone-900/80 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-burgundy-700 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleWholesaleRequest}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#20bd5a]"
                  >
                    <MessageCircle size={15} />
                    Send to Stefan on WhatsApp
                  </button>

                  {requestSent && (
                    <div className="mt-4 rounded-[20px] border border-emerald-900/50 bg-emerald-950/20 px-4 py-4 text-sm leading-6 text-emerald-100">
                      Your WhatsApp request has been prepared for Stefan. Once he approves it, use
                      the code he sends you to unlock the wholesale counter on this device.
                    </div>
                  )}

                  <div className="my-8 h-px bg-stone-800" />

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                      Already have the code?
                    </p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex-1">
                        <KeyRound
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                        />
                        <input
                          value={accessCode}
                          onChange={(event) => setAccessCode(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              handleWholesaleCodeSubmit();
                            }
                          }}
                          placeholder="Enter wholesale code"
                          className="w-full rounded-full border border-stone-800 bg-stone-900/80 py-3 pl-11 pr-4 text-sm text-stone-100 placeholder:text-stone-500 focus:border-burgundy-700 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleWholesaleCodeSubmit}
                        className="inline-flex items-center justify-center rounded-full bg-burgundy-800 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-100 transition-colors hover:bg-burgundy-700"
                      >
                        Unlock wholesale
                      </button>
                    </div>
                  </div>

                  {accessError && (
                    <p className="mt-4 rounded-[18px] border border-burgundy-900/50 bg-burgundy-950/30 px-4 py-3 text-sm leading-6 text-burgundy-100">
                      {accessError}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CategoryBanner: React.FC<{ category: string; count: number }> = ({ category, count }) => {
  const visual = CATEGORY_VISUALS[category];
  const fallbackGradient =
    CATEGORY_GRADIENTS[category] ?? "linear-gradient(135deg, #10233f 0%, #0c0a09 100%)";

  return (
    <div className="relative mb-7 overflow-hidden rounded-[28px] border border-stone-800/80 bg-stone-900 min-h-[240px] sm:min-h-[280px]">
      {visual?.image ? (
        <img
          src={visual.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: visual.objectPosition ?? "center 45%" }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: fallbackGradient }} />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/60 to-stone-950/12" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/78 via-transparent to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-stone-950/55 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-300 backdrop-blur-sm">
            Butcher&apos;s Counter
          </span>
          <span className="rounded-full border border-burgundy-700/35 bg-burgundy-900/35 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-burgundy-300">
            {count} item{count === 1 ? "" : "s"}
          </span>
        </div>

        <div className="max-w-xl">
          <div className="mb-3 h-12 w-[3px] rounded-full bg-gradient-to-b from-burgundy-500 to-transparent" />
          <h4 className="text-3xl font-serif text-stone-50 sm:text-4xl">{category}</h4>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-300 sm:text-base">
            {visual?.tagline ?? "A refined selection prepared with the same care as the in-store counter."}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const { add, orderType } = useCart();
  const [flash, setFlash] = useState(false);
  const rules = getQuantityRules(product);

  const handleAdd = () => {
    const initialQty = rules.minQty;
    add(product, orderType, initialQty);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 750);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut", delay: Math.min(index * 0.035, 0.35) }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[26px] border border-stone-800/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5 shadow-[0_22px_64px_-42px_rgba(0,0,0,0.95)] transition-all duration-300 hover:border-burgundy-700/55"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(36,83,136,0.18),transparent_32%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-burgundy-400">
              {product.category}
            </div>
            <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
              {getFulfilmentTag(product)}
            </div>
          </div>
          <div className="rounded-full border border-stone-700/80 bg-stone-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-300">
            {getOrderMeta(product)}
          </div>
        </div>

        <h4 className="mt-5 text-2xl font-serif leading-tight text-stone-100 transition-colors duration-300 group-hover:text-white">
          {product.name}
        </h4>

        <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-stone-400">
          {getProductBlurb(product)}
        </p>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-stone-800/80 pt-5">
          <div>
            <div className="text-2xl font-serif leading-none text-stone-100">
              {product.priceLabel ?? formatZAR(product.price)}
            </div>
            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
              per {product.unit === "kg" ? "kg" : "item"}
            </div>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${
              flash
                ? "bg-stone-100 text-stone-950"
                : "bg-burgundy-800 text-stone-100 shadow-[0_12px_28px_-16px_rgba(16,35,63,0.9)] hover:bg-burgundy-700"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {flash ? (
              <>
                <Check size={13} strokeWidth={2.5} />
                Added
              </>
            ) : (
              <>
                <Plus size={13} strokeWidth={2.5} />
                Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export const ShopGrid: React.FC = () => {
  const { orderType, openCart, count } = useCart();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const isWholesaleUnlocked = getStoredWholesaleAccess();

  const activeOrderType =
    orderType === "wholesale" && !isWholesaleUnlocked ? "retail" : orderType;

  const products = activeOrderType === "retail" ? RETAIL_PRODUCTS : WHOLESALE_PRODUCTS;
  const order = CATEGORY_ORDER[activeOrderType];

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return products.filter(
      (product) =>
        (activeCat === "All" || product.category === activeCat) &&
        (!lower ||
          product.name.toLowerCase().includes(lower) ||
          product.category.toLowerCase().includes(lower) ||
          (product.note?.toLowerCase().includes(lower) ?? false))
    );
  }, [products, query, activeCat]);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    filtered.forEach((product) => {
      if (!map.has(product.category)) map.set(product.category, []);
      map.get(product.category)!.push(product);
    });
    return order
      .filter((category) => map.has(category))
      .map((category) => ({ category, items: map.get(category)! }));
  }, [filtered, order]);

  return (
    <section id="shop-grid" className="relative overflow-hidden bg-stone-950 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(36,83,136,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.88fr] xl:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-burgundy-500" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-burgundy-400">
                {activeOrderType === "retail" ? "Retail selection" : "Wholesale selection"}
              </div>
            </div>
            <h3 className="max-w-3xl text-4xl font-serif leading-tight text-stone-100 md:text-5xl">
              {activeOrderType === "retail"
                ? "Browse the retail counter with confidence"
                : "Plan larger orders through a cleaner wholesale counter"}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-400">
              {activeOrderType === "retail"
                ? "Search by cut, shop by category and build an order for family meals, weekend braais and quick repeat shopping."
                : "Move through bulk meat, deli and pantry lines without the clutter, with a layout made for quicker comparison and repeat trade buying."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-stone-800/80 bg-stone-900/75 px-5 py-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Categories
                </div>
                <div className="mt-3 text-3xl font-serif text-stone-100">{grouped.length}</div>
              </div>
              <div className="rounded-[22px] border border-stone-800/80 bg-stone-900/75 px-5 py-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Products shown
                </div>
                <div className="mt-3 text-3xl font-serif text-stone-100">{filtered.length}</div>
              </div>
              <div className="rounded-[22px] border border-stone-800/80 bg-stone-900/75 px-5 py-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Cart items
                </div>
                <div className="mt-3 text-3xl font-serif text-stone-100">{count}</div>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-stone-800/80 bg-stone-900/80 p-5 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.85)] backdrop-blur-sm">
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Refine the counter
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                  size={16}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products, categories or notes"
                  className="w-full rounded-full border border-stone-800 bg-stone-950/80 py-3 pl-11 pr-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-burgundy-700 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={openCart}
                className="inline-flex items-center justify-between rounded-full bg-burgundy-800 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-100 transition-colors duration-200 hover:bg-burgundy-700"
              >
                <span className="inline-flex items-center gap-2">
                  <ShoppingBag size={15} />
                  View cart
                </span>
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] text-stone-950">
                  {count}
                </span>
              </button>
            </div>

            <div className="mt-4 rounded-[22px] border border-white/6 bg-white/[0.02] px-4 py-4 text-sm leading-6 text-stone-400">
              Place your order online and we will confirm availability, portioning and final totals
              with you before collection or fulfilment is final. No online payment is taken at
              checkout.
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto pb-2 [scrollbar-width:none]">
          <div className="flex min-w-max gap-2">
            {["All", ...order].map((category) => {
              const active = activeCat === category;

              return (
                <motion.button
                  key={category}
                  type="button"
                  whileHover={active ? undefined : { y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCat(category)}
                  className={`relative whitespace-nowrap rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                    active
                      ? "border-burgundy-700 bg-burgundy-800 text-stone-100"
                      : "border-stone-700/70 bg-stone-900/70 text-stone-400 hover:border-stone-500 hover:text-stone-200"
                  }`}
                >
                  {category}
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeOrderType}-${activeCat}-${query}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mt-10"
          >
            {grouped.length === 0 ? (
              <div className="rounded-[28px] border border-stone-800/80 bg-stone-900/60 px-6 py-20 text-center">
                <div className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">
                  No matches
                </div>
                <p className="mt-3 text-stone-400">
                  Try a broader product name or switch to another category.
                </p>
              </div>
            ) : (
              grouped.map((group) => (
                <div key={group.category} className="mb-16 last:mb-0">
                  <CategoryBanner category={group.category} count={group.items.length} />
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {group.items.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {activeOrderType === "wholesale" && (
          <div className="mt-14 rounded-[28px] border border-burgundy-900/40 bg-[linear-gradient(180deg,rgba(16,35,63,0.28),rgba(12,10,9,0.9))] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-burgundy-300">
                  Wholesale note
                </div>
                <h4 className="mt-3 text-2xl font-serif text-stone-100">
                  Built for restaurants, resellers and larger-format buying.
                </h4>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-stone-300">
                Trade pricing is intended for registered businesses and repeat service customers.
                Final availability, pack sizes, minimums and fulfilment timing are confirmed
                directly by the Coleridge Meat team once your order lands.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
