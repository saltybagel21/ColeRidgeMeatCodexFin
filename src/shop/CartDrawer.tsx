import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, formatZAR } from "./CartContext";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, setQty, remove, clear, subtotal, orderType, openCheckout } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-[70]"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-stone-950 border-l border-stone-800 z-[71] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-burgundy-500 mb-1">
                  {orderType} order
                </div>
                <h3 className="text-2xl font-serif text-stone-100 flex items-center gap-2">
                  <ShoppingBag size={20} /> Your Cart
                </h3>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-stone-900 hover:text-stone-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16">
                  <div className="w-20 h-20 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center mb-6">
                    <ShoppingBag size={28} className="text-stone-600" />
                  </div>
                  <h4 className="text-xl font-serif text-stone-100 mb-2">Your cart is empty</h4>
                  <p className="text-stone-500 text-sm mb-6">Browse our selection and add items to get started.</p>
                  <button onClick={closeCart} className="px-6 py-3 border border-stone-700 text-stone-200 rounded-sm text-xs font-semibold tracking-widest uppercase hover:bg-stone-900 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-stone-900">
                  {items.map(l => {
                    const isKg = l.product.unit === "kg";
                    const step = l.product.qtyStep ?? (isKg ? 0.5 : 1);
                    const minQ = l.product.minQty ?? (isKg ? 0.5 : 1);
                    const maxQ = l.product.maxQty;
                    const decrement = () => {
                      const next = parseFloat((l.qty - step).toFixed(3));
                      if (next < minQ) remove(l.product.id);
                      else setQty(l.product.id, next);
                    };
                    const increment = () => {
                      const next = parseFloat((l.qty + step).toFixed(3));
                      setQty(l.product.id, maxQ ? Math.min(maxQ, next) : next);
                    };
                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = parseFloat(e.target.value);
                      if (isNaN(v)) return;
                      const clamped = maxQ ? Math.min(maxQ, Math.max(minQ, v)) : Math.max(minQ, v);
                      setQty(l.product.id, clamped);
                    };
                    return (
                    <li key={l.product.id} className="p-5 flex gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-burgundy-500 mb-1">
                          {l.product.category}
                        </div>
                        <h4 className="text-stone-100 font-serif leading-snug mb-1">{l.product.name}</h4>
                        <div className="text-xs text-stone-500 mb-3">
                          {formatZAR(l.product.price)} / {isKg ? "kg" : "unit"}
                          {maxQ && <span className="ml-1">({minQ}–{maxQ}kg)</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-stone-800 rounded-sm">
                            <button
                              onClick={decrement}
                              aria-label="Decrease"
                              className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
                            ><Minus size={14} /></button>
                            <input
                              type="number"
                              min={minQ}
                              max={maxQ}
                              step={step}
                              value={l.qty}
                              onChange={handleChange}
                              className="w-14 h-8 bg-transparent text-center text-sm text-stone-100 focus:outline-none"
                            />
                            <button
                              onClick={increment}
                              aria-label="Increase"
                              className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
                            ><Plus size={14} /></button>
                          </div>
                          <span className="text-[10px] tracking-widest uppercase text-stone-500">
                            {isKg ? "kg" : "units"}
                          </span>
                          <button
                            onClick={() => remove(l.product.id)}
                            aria-label="Remove"
                            className="ml-auto text-stone-500 hover:text-burgundy-500 transition-colors"
                          ><Trash2 size={16} /></button>
                        </div>
                      </div>
                      <div className="text-right font-serif text-stone-100 shrink-0 w-24">
                        {formatZAR(l.product.price * l.qty)}
                      </div>
                    </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-stone-800 p-6 bg-stone-900/50">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs tracking-widest uppercase text-stone-400">Subtotal</span>
                  <span className="text-3xl font-serif text-stone-100">{formatZAR(subtotal)}</span>
                </div>
                <p className="text-[11px] text-stone-500 mb-5 leading-relaxed">
                  Prices incl. VAT. Final total confirmed by our team (cut weights may vary slightly).
                </p>
                <button
                  onClick={openCheckout}
                  className="w-full py-4 bg-burgundy-800 hover:bg-burgundy-700 text-stone-100 rounded-sm text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </button>
                <button
                  onClick={clear}
                  className="w-full mt-3 py-3 text-[11px] font-semibold tracking-widest uppercase text-stone-500 hover:text-burgundy-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
