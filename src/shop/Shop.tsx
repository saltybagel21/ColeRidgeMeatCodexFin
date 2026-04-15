import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Plus, Store, Building2, ArrowRight, Search, Check } from "lucide-react";
import { RETAIL_PRODUCTS, WHOLESALE_PRODUCTS, CATEGORY_ORDER } from "./products";
import type { Product } from "./products";
import { useCart, formatZAR } from "./CartContext";

// ---------------------------------------------------------------------------
// Category visual config — image (if available) + editorial tagline
// ---------------------------------------------------------------------------
const CATEGORY_VISUALS: Record<string, { image?: string; tagline: string; objectPosition?: string }> = {
  "Beef": {
    image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2069&auto=format&fit=crop",
    tagline: "Premium cuts, aged and butchered in-store.",
    objectPosition: "center 40%",
  },
  "Lamb": {
    image: "https://www.shutterstock.com/image-photo/panorama-banner-grilled-lamb-chops-260nw-1145167235.jpg",
    tagline: "Free-range, tender and full of flavour.",
    objectPosition: "center 50%",
  },
  "Chicken": {
    image: "https://t4.ftcdn.net/jpg/02/87/89/95/360_F_287899521_Kb6lPD0Ezo14l1YvkINUcJtGuj7XxBI7.jpg",
    tagline: "Whole birds, fillets, wings and braai cuts.",
    objectPosition: "center 50%",
  },
  "Ready to Cook": {
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    tagline: "Marinated, seasoned and ready for the fire.",
    objectPosition: "center 40%",
  },
  "Ostrich": {
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    tagline: "Lean, distinctive and proudly South African.",
    objectPosition: "center 45%",
  },
  "Fish": {
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?q=80&w=2035&auto=format&fit=crop",
    tagline: "Fresh catches, sourced and ready to cook.",
    objectPosition: "center 62%",
  },
  "Cheese & Pantry": {
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
    tagline: "Artisan selections and essential pantry lines.",
    objectPosition: "center 55%",
  },
  "Budget Items": {
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop",
    tagline: "Quality cuts, exceptional value.",
    objectPosition: "center 40%",
  },
  "Minces": {
    image: "https://www.shutterstock.com/image-photo/raw-minced-meat-spices-vegetables-260nw-1947346570.jpg",
    tagline: "Steak-quality mince, vacuum packed and consistent.",
    objectPosition: "center 50%",
  },
  "Cheese": {
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
    tagline: "Artisan and bulk cheese for the trade.",
    objectPosition: "center 55%",
  },
  "Bulk & Pantry": {
    image: "https://static.vecteezy.com/system/resources/thumbnails/030/353/445/small/french-fries-background-ai-generated-photo.jpg",
    tagline: "Large-format pantry lines built for the trade.",
    objectPosition: "center 50%",
  },
};

// Gradient fallback per category (used when no image is set)
const CATEGORY_GRADIENTS: Record<string, string> = {
  "Ostrich":        "linear-gradient(120deg, #1a2a0e 0%, #0c0a09 100%)",
  "Fish":           "linear-gradient(120deg, #0a1f1e 0%, #0c0a09 100%)",
  "Cheese & Pantry":"linear-gradient(120deg, #2a1f0a 0%, #0c0a09 100%)",
  "Budget Items":   "linear-gradient(120deg, #1a100a 0%, #0c0a09 100%)",
  "Minces":         "linear-gradient(120deg, #2a0c0c 0%, #0c0a09 100%)",
  "Cheese":         "linear-gradient(120deg, #2a1f0a 0%, #0c0a09 100%)",
  "Bulk & Pantry":  "linear-gradient(120deg, #1a1a0a 0%, #0c0a09 100%)",
};

// ---------------------------------------------------------------------------
// Entry switcher: Retail vs Wholesale
// ---------------------------------------------------------------------------
export const ShopSwitch: React.FC = () => {
  const { orderType, setOrderType } = useCart();

  const cards = [
    {
      key: "retail" as const,
      icon: <Store className="w-8 h-8 text-burgundy-500" />,
      title: "Shop Retail",
      kicker: "For Families & Home Cooks",
      desc: "Our full in-store range, portioned for your table. Braai packs, premium steaks, signature boerewors and everything in between.",
      cta: "Browse Retail"
    },
    {
      key: "wholesale" as const,
      icon: <Building2 className="w-8 h-8 text-burgundy-500" />,
      title: "Shop Wholesale",
      kicker: "For Restaurants, Butchers & Traders",
      desc: "Bulk pricing on whole sirloins, 5kg vacuum packs, grated cheese and pantry bulks. Consistent quality for the trade.",
      cta: "Browse Wholesale"
    }
  ];

  return (
    <section id="shop" className="py-24 md:py-32 bg-stone-950 border-y border-stone-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-burgundy-900/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-burgundy-600 mb-4">Order Online</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-100">Choose how you shop.</h3>
          <p className="mt-6 text-stone-400 max-w-2xl mx-auto">
            Two entrances, one butcher. Browse retail for your table, or wholesale for your business.
            All orders are confirmed by our team before collection or delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(c => {
            const active = orderType === c.key;
            return (
              <motion.button
                key={c.key}
                onClick={() => { setOrderType(c.key); document.getElementById("shop-grid")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ y: -4 }}
                className={`group relative text-left p-10 rounded-sm border transition-colors duration-300 overflow-hidden
                  ${active
                    ? "border-burgundy-700 bg-gradient-to-br from-burgundy-900/40 to-stone-900"
                    : "border-stone-800 bg-stone-900 hover:border-burgundy-800/60"}`}
              >
                {active && (
                  <span className="absolute top-5 right-5 px-3 py-1 bg-burgundy-700 text-stone-100 text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full">
                    Active
                  </span>
                )}
                <div className="w-16 h-16 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center mb-8 group-hover:bg-burgundy-900/20 transition-colors">
                  {c.icon}
                </div>
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-burgundy-500 mb-3">{c.kicker}</div>
                <h4 className="text-3xl md:text-4xl font-serif text-stone-100 mb-4">{c.title}</h4>
                <p className="text-stone-400 leading-relaxed mb-8 max-w-md">{c.desc}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-200 border-b border-burgundy-600 pb-1 group-hover:text-burgundy-300 transition-colors">
                  {c.cta} <ArrowRight size={14} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Category section banner — atmospheric visual + editorial heading
// ---------------------------------------------------------------------------
const CategoryBanner: React.FC<{ category: string; count: number }> = ({ category, count }) => {
  const visual = CATEGORY_VISUALS[category];
  const fallbackGradient = CATEGORY_GRADIENTS[category] ?? "linear-gradient(120deg, #1a100a 0%, #0c0a09 100%)";

  return (
    <div className="relative overflow-hidden rounded-sm mb-6" style={{ height: "260px" }}>
      {/* Background: image or gradient */}
      {visual?.image ? (
        <img
          src={visual.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: visual.objectPosition ?? "center 40%" }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: fallbackGradient }} />
      )}

      {/* Overlay: lighter on the right so the image breathes, darker on left for text */}
      {visual?.image && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/55 to-stone-950/10" />
      )}
      {/* Bottom fade so it blends into the product grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-stone-800/60" />

      {/* Content */}
      <div className="relative h-full flex items-end px-8 sm:px-12 pb-8 gap-6">
        {/* Left accent bar */}
        <div className="w-[3px] h-16 rounded-full shrink-0 mb-1" style={{ background: "linear-gradient(to bottom, #1a6fcc, #0c2d4a44)" }} />

        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-burgundy-400 mb-2 opacity-90">
            Now browsing
          </div>
          <h4 className="text-3xl sm:text-4xl font-serif text-stone-50 leading-none mb-2 drop-shadow-lg">
            {category}
          </h4>
          {visual?.tagline && (
            <p className="text-sm text-stone-300/80 leading-relaxed max-w-sm hidden sm:block drop-shadow">
              {visual.tagline}
            </p>
          )}
        </div>

        {/* Item count */}
        <div className="hidden sm:block shrink-0 text-right opacity-70">
          <div className="text-5xl font-serif text-stone-300 leading-none tabular-nums drop-shadow">{count}</div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-1">
            {count === 1 ? "product" : "products"}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Product card — text-only, elevated hierarchy and polish
// ---------------------------------------------------------------------------
const ProductCard: React.FC<{ p: Product; index: number }> = ({ p, index }) => {
  const { add, orderType } = useCart();
  const [flash, setFlash] = useState(false);

  const handleAdd = () => {
    const initialQty = p.minQty ?? (p.unit === "kg" ? 0.5 : 1);
    add(p, orderType, initialQty);
    setFlash(true);
    setTimeout(() => setFlash(false), 650);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: Math.min(index * 0.04, 0.48) }}
      whileHover={{ y: -3 }}
      className="group relative bg-stone-900 border border-stone-800/60 rounded-sm overflow-hidden flex flex-col
        hover:border-burgundy-700/60 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.7)]
        transition-all duration-300"
    >
      {/* Hover top accent line — slides in from left */}
      <div
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: "linear-gradient(to right, #1a6fcc, #0c2d4a)" }}
        aria-hidden="true"
      />

      {/* Subtle inner top gradient for depth */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.025), transparent)" }}
        aria-hidden="true"
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Category label */}
        <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-burgundy-500/70 mb-2.5">
          {p.category}
        </div>

        {/* Product name */}
        <h4 className="text-[16px] font-serif text-stone-100 leading-snug mb-2 group-hover:text-white transition-colors">
          {p.name}
        </h4>

        {/* Note / description */}
        {p.note ? (
          <p className="text-[11px] text-stone-500 leading-relaxed mb-auto">{p.note}</p>
        ) : (
          <div className="mb-auto" />
        )}

        {/* Action row — pinned to bottom */}
        <div className="mt-5 pt-4 border-t border-stone-800/50 flex items-end justify-between gap-3">
          <div>
            <div className="text-[21px] font-serif text-stone-100 leading-none tracking-tight group-hover:text-white transition-colors">
              {p.priceLabel ?? formatZAR(p.price)}
            </div>
            <div className="text-[9px] tracking-[0.22em] uppercase text-stone-600 mt-1">
              per {p.unit === "kg" ? "kg" : "unit"}
            </div>
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.88 }}
            aria-label={`Add ${p.name} to cart`}
            className={`relative shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm
              text-[10px] font-bold tracking-widest uppercase transition-all duration-200
              ${flash
                ? "bg-stone-100 text-stone-950 shadow-none"
                : "bg-burgundy-800 text-stone-100 hover:bg-burgundy-700 shadow-[0_4px_16px_-4px_rgba(12,45,74,0.7)]"
              }`}
          >
            {flash
              ? <><Check size={12} strokeWidth={2.5} /> Added</>
              : <><Plus size={12} strokeWidth={2.5} /> Add</>
            }
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main shop grid
// ---------------------------------------------------------------------------
export const ShopGrid: React.FC = () => {
  const { orderType, openCart, count } = useCart();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const products = orderType === "retail" ? RETAIL_PRODUCTS : WHOLESALE_PRODUCTS;
  const order = CATEGORY_ORDER[orderType];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p =>
      (activeCat === "All" || p.category === activeCat) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
  }, [products, query, activeCat]);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    filtered.forEach(p => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    });
    return order.filter(c => map.has(c)).map(c => ({ category: c, items: map.get(c)! }));
  }, [filtered, order]);

  return (
    <section id="shop-grid" className="py-20 md:py-28 bg-stone-950 relative overflow-hidden">

      {/* Subtle ambient glow — top centre */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(12,45,74,0.18) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            {/* Kicker with decorative leading line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-[1px] bg-burgundy-600" />
              <div className="text-[11px] font-semibold tracking-[0.28em] uppercase text-burgundy-500">
                {orderType === "retail" ? "Retail Selection" : "Wholesale Selection"}
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-stone-100 mb-4">
              {orderType === "retail" ? "Cuts for your table." : "Built for the trade."}
            </h3>
            <p className="text-stone-400 max-w-xl leading-relaxed">
              {orderType === "retail"
                ? "Fresh, farm-raised and cut in-store. Add what you need and we'll confirm your order."
                : "Wholesale pricing for registered businesses. Bulk formats, consistent quality. Orders confirmed by our team."}
            </p>
          </div>

          {/* Search + cart row */}
          <div className="flex flex-col sm:flex-row gap-3 lg:min-w-[420px]">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={15} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-800 rounded-sm
                  text-sm text-stone-200 placeholder:text-stone-600
                  focus:outline-none focus:border-burgundy-700 focus:bg-stone-900
                  transition-colors duration-200"
              />
            </div>
            <button
              onClick={openCart}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-3
                bg-burgundy-800 hover:bg-burgundy-700 text-stone-100
                rounded-sm text-[11px] font-semibold tracking-widest uppercase
                transition-colors duration-200 shadow-[0_4px_16px_-4px_rgba(12,45,74,0.5)]"
            >
              <ShoppingBag size={15} /> View Cart
              {count > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-stone-100 text-stone-950 text-[10px] font-bold leading-none">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Category pills ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {["All", ...order].map(c => (
            <motion.button
              key={c}
              onClick={() => setActiveCat(c)}
              whileHover={activeCat !== c ? { scale: 1.04 } : {}}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase border transition-colors duration-200
                ${activeCat === c
                  ? "border-transparent text-stone-100"
                  : "border-stone-700/60 text-stone-500 hover:text-stone-200 hover:border-stone-500/70 bg-transparent"
                }`}
            >
              {activeCat === c && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full bg-burgundy-800 border border-burgundy-700"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.42 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </motion.button>
          ))}
        </div>

        {/* ── Product sections ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={orderType + activeCat + query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {grouped.length === 0 && (
              <div className="text-center py-24 text-stone-600 text-sm tracking-wide">
                No products match your search.
              </div>
            )}

            {grouped.map(g => (
              <div key={g.category} className="mb-16 last:mb-0">

                {/* Category section banner */}
                <CategoryBanner category={g.category} count={g.items.length} />

                {/* Product grid — text-only cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {g.items.map((p, i) => (
                    <ProductCard key={p.id} p={p} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Wholesale notice ─────────────────────────────────────────────────── */}
        {orderType === "wholesale" && (
          <div className="mt-14 flex gap-5 p-6 bg-stone-900 border border-burgundy-900/50 rounded-sm">
            <div className="w-[2px] shrink-0 rounded-full bg-burgundy-700/60 self-stretch" />
            <p className="text-sm text-stone-400 leading-relaxed">
              <span className="text-stone-200 font-semibold">Wholesale note:</span>{" "}
              Wholesale pricing is intended for registered businesses, restaurants and resellers.
              A member of our team will confirm availability and minimum order quantities after you submit your order.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
