import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { OrderType, Product } from "./products";

export interface CartLine {
  product: Product;
  qty: number;
  orderType: OrderType;
}

interface CartState {
  items: CartLine[];
  orderType: OrderType;
  setOrderType: (t: OrderType) => void;
  add: (p: Product, orderType: OrderType, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartCtx = createContext<CartState | null>(null);
const STORAGE = "coleridge-cart-v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartLine[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("retail");
  const [isOpen, setOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  // Load from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Array.isArray(saved.items)) setItems(saved.items);
      if (saved.orderType === "retail" || saved.orderType === "wholesale") setOrderType(saved.orderType);
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify({ items, orderType })); } catch {}
  }, [items, orderType]);

  // Clear cart when switching modes — retail and wholesale products have different IDs/prices
  const handleSetOrderType = (t: OrderType) => {
    if (t !== orderType && items.length > 0) {
      if (!window.confirm("Switching between Retail and Wholesale will clear your current cart. Continue?")) return;
      setItems([]);
    }
    setOrderType(t);
  };

  const add: CartState["add"] = (p, ot, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(l => l.product.id === p.id);
      if (existing) {
        return prev.map(l => l.product.id === p.id ? { ...l, qty: l.qty + qty } : l);
      }
      return [...prev, { product: p, qty, orderType: ot }];
    });
    setOpen(true);
  };

  const setQty: CartState["setQty"] = (id, qty) => {
    if (qty <= 0) return remove(id);
    setItems(prev => prev.map(l => l.product.id === id ? { ...l, qty } : l));
  };

  const remove: CartState["remove"] = (id) => {
    setItems(prev => prev.filter(l => l.product.id !== id));
  };

  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((s, l) => s + l.product.price * l.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  const value: CartState = {
    items, orderType, setOrderType: handleSetOrderType,
    add, setQty, remove, clear,
    subtotal, count,
    isOpen, openCart: () => setOpen(true), closeCart: () => setOpen(false),
    isCheckoutOpen,
    openCheckout: () => { setCheckoutOpen(true); setOpen(false); },
    closeCheckout: () => setCheckoutOpen(false),
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

export const formatZAR = (n: number) =>
  "R" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
