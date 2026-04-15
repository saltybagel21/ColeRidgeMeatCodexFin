import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { useCart, formatZAR } from "./CartContext";

const BUSINESS_EMAIL = "info@coleridgemeat.co.za";

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  fulfilment: "collection" | "delivery";
  address: string;
  notes: string;
}

const empty: CheckoutForm = {
  fullName: "", phone: "", email: "", company: "",
  fulfilment: "collection", address: "", notes: ""
};

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, items, subtotal, orderType, clear } = useCart();
  const [form, setForm] = useState<CheckoutForm>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = <K extends keyof CheckoutForm>(k: K, v: CheckoutForm[K]) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 9) e.phone = "Valid phone required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.fulfilment === "delivery" && !form.address.trim()) e.address = "Required for delivery";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildOrderSummary = () => {
    const lines = items.map(l =>
      `• ${l.product.name} — ${l.qty} ${l.product.unit === "kg" ? "kg" : "unit(s)"} × ${formatZAR(l.product.price)} = ${formatZAR(l.product.price * l.qty)}`
    ).join("\n");
    return (
`NEW ${orderType.toUpperCase()} ORDER — Coleridge Meat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:     ${form.fullName}
Phone:    ${form.phone}
Email:    ${form.email}
Company:  ${form.company || "—"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULFILMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Method:   ${form.fulfilment === "collection" ? "Collection (in store)" : "Delivery"}
${form.fulfilment === "delivery" ? `Address:  ${form.address}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER (${orderType.toUpperCase()})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${lines}

TOTAL: ${formatZAR(subtotal)}
(Prices incl. VAT. Final total to be confirmed based on cut weights.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${form.notes || "—"}
`);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || items.length === 0) return;
    setStatus("submitting");

    const body = buildOrderSummary();
    const subject = `New ${orderType} order — ${form.fullName}`;

    // Primary: FormSubmit.co (no backend, no signup — the business just confirms the email once).
    // Falls back to mailto: if the POST fails (e.g. offline, blocked).
    try {
      const fd = new FormData();
      fd.append("_subject", subject);
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      fd.append("Order Type", orderType);
      fd.append("Full Name", form.fullName);
      fd.append("Phone", form.phone);
      fd.append("Email", form.email);
      fd.append("Company", form.company || "—");
      fd.append("Fulfilment", form.fulfilment);
      if (form.fulfilment === "delivery") fd.append("Delivery Address", form.address);
      fd.append("Notes", form.notes || "—");
      fd.append("Order Summary", body);
      fd.append("Total", formatZAR(subtotal));

      const res = await fetch(`https://formsubmit.co/ajax/${BUSINESS_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!res.ok) throw new Error("FormSubmit failed");
    } catch {
      // Fallback — open user's email client pre-populated.
      const mailto = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }

    setStatus("success");
    clear();
  };

  const handleClose = () => {
    closeCheckout();
    setTimeout(() => { setStatus("idle"); setForm(empty); setErrors({}); }, 400);
  };

  const inputBase = "w-full px-4 py-3 bg-stone-950 border rounded-sm text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none transition-colors";
  const inputOk = "border-stone-800 focus:border-burgundy-700";
  const inputErr = "border-burgundy-600 focus:border-burgundy-500";

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-[80]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[81] overflow-y-auto p-4 sm:p-8 flex items-start sm:items-center justify-center"
            onClick={handleClose}
          >
            <div
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-sm shadow-2xl my-auto"
            >
              {status === "success" ? (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-20 h-20 rounded-full bg-burgundy-900/30 border border-burgundy-700 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="text-burgundy-400" size={40} />
                  </motion.div>
                  <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-burgundy-500 mb-3">Order Received</div>
                  <h3 className="text-3xl md:text-4xl font-serif text-stone-100 mb-4">Thank you.</h3>
                  <p className="text-stone-400 leading-relaxed max-w-md mx-auto mb-8">
                    We've sent your order to our team at <span className="text-stone-200">{BUSINESS_EMAIL}</span>.
                    You'll get a call or email shortly to confirm availability, final weights and collection or delivery details.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-4 bg-burgundy-800 hover:bg-burgundy-700 text-stone-100 rounded-sm text-xs font-semibold tracking-widest uppercase transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="p-6 sm:p-8 border-b border-stone-800 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-burgundy-500 mb-2">
                        {orderType} checkout
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif text-stone-100">Confirm your details</h3>
                      <p className="text-stone-500 text-sm mt-2">
                        We'll email your order to our butchers and get back to you to confirm.
                      </p>
                    </div>
                    <button
                      type="button" onClick={handleClose} aria-label="Close"
                      className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-100 transition-colors shrink-0"
                    ><X size={18} /></button>
                  </div>

                  <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Full Name *</label>
                        <input value={form.fullName} onChange={e => update("fullName", e.target.value)}
                          className={`${inputBase} ${errors.fullName ? inputErr : inputOk}`} placeholder="Jane Smith" />
                        {errors.fullName && <p className="text-burgundy-400 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Phone *</label>
                        <input value={form.phone} onChange={e => update("phone", e.target.value)}
                          className={`${inputBase} ${errors.phone ? inputErr : inputOk}`} placeholder="061 234 5678" />
                        {errors.phone && <p className="text-burgundy-400 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Email *</label>
                        <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
                          className={`${inputBase} ${errors.email ? inputErr : inputOk}`} placeholder="you@example.com" />
                        {errors.email && <p className="text-burgundy-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Company (optional)</label>
                        <input value={form.company} onChange={e => update("company", e.target.value)}
                          className={`${inputBase} ${inputOk}`} placeholder={orderType === "wholesale" ? "Restaurant / business name" : "—"} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Fulfilment *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["collection", "delivery"] as const).map(opt => (
                          <button type="button" key={opt} onClick={() => update("fulfilment", opt)}
                            className={`py-3 rounded-sm text-xs font-semibold tracking-widest uppercase border transition-colors
                              ${form.fulfilment === opt
                                ? "bg-burgundy-800 border-burgundy-700 text-stone-100"
                                : "border-stone-800 text-stone-400 hover:border-stone-600 hover:text-stone-200"}`}>
                            {opt === "collection" ? "Collect In-Store" : "Arrange Delivery"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {form.fulfilment === "delivery" && (
                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Delivery Address *</label>
                        <input value={form.address} onChange={e => update("address", e.target.value)}
                          className={`${inputBase} ${errors.address ? inputErr : inputOk}`} placeholder="Street, suburb, city, postcode" />
                        {errors.address && <p className="text-burgundy-400 text-xs mt-1">{errors.address}</p>}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Notes / Special Requests</label>
                      <textarea value={form.notes} onChange={e => update("notes", e.target.value)} rows={3}
                        className={`${inputBase} ${inputOk} resize-none`}
                        placeholder="Cut preferences, collection time, allergies, etc." />
                    </div>

                    {/* Order recap */}
                    <div className="bg-stone-950 border border-stone-800 rounded-sm p-4">
                      <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-burgundy-500 mb-3">Order summary</div>
                      <ul className="space-y-1.5 text-sm">
                        {items.map(l => (
                          <li key={l.product.id} className="flex justify-between gap-3 text-stone-300">
                            <span className="truncate">{l.qty} {l.product.unit === "kg" ? "kg" : "×"} {l.product.name}</span>
                            <span className="text-stone-400 shrink-0">{formatZAR(l.product.price * l.qty)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-stone-800">
                        <span className="text-xs tracking-widest uppercase text-stone-400">Total</span>
                        <span className="text-2xl font-serif text-stone-100">{formatZAR(subtotal)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 border-t border-stone-800 bg-stone-950/40">
                    <button
                      type="submit"
                      disabled={status === "submitting" || items.length === 0}
                      className="w-full py-4 bg-burgundy-800 hover:bg-burgundy-700 disabled:opacity-60 disabled:cursor-not-allowed text-stone-100 rounded-sm text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      {status === "submitting" ? (
                        <><Loader2 size={16} className="animate-spin" /> Sending Order…</>
                      ) : (
                        <><Mail size={16} /> Submit Order</>
                      )}
                    </button>
                    <p className="text-[11px] text-stone-500 text-center mt-3 leading-relaxed">
                      No payment is taken online. Your order is emailed directly to our team for confirmation.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
