// Product catalogue sourced from Coleridge Meat Retail + Wholesale price lists (April 2026).
// Prices are in ZAR, incl. VAT unless noted. Units: "kg" (per kilogram) or "each" (per unit).

export type PriceUnit = "kg" | "each";
export type OrderType = "retail" | "wholesale";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;      // ZAR incl. VAT (0 = price on request / N/S)
  priceLabel?: string; // overrides formatted price display (e.g. "N/S")
  unit: PriceUnit;
  note?: string;      // packing / availability / recommendation
  image?: string;
  // Ordering constraints derived from price list packing rules:
  minQty?: number;    // minimum quantity (kg or units). Default: 0.5 for kg, 1 for each
  maxQty?: number;    // maximum quantity (kg), e.g. for whole cuts with a weight range
  qtyStep?: number;   // stepper increment. Default: 0.5 for kg, 1 for each
}

// ---------------------------------------------------------------------------
// RETAIL
// ---------------------------------------------------------------------------
export const RETAIL_PRODUCTS: Product[] = [

  // ── Chicken ───────────────────────────────────────────────────────────────
  { id: "r-chk-fillet",       name: "Chicken Fillet",                        category: "Chicken",       price: 69.99,  unit: "kg",   note: "Sold in 5kg bags • Lean fillet for whatever you need",                  minQty: 5,   qtyStep: 5 },
  { id: "r-chk-fillet-pc",    name: "Chicken Fillet Pieces",                 category: "Chicken",       price: 84.99,  unit: "kg",   note: "Cut smaller than 1cm by hand • Made on order • Great for pizza toppings" },
  { id: "r-chk-wings",        name: "Chicken Wings",                         category: "Chicken",       price: 74.99,  unit: "kg",   note: "Individually frozen — sold in 5kg bags • Great for platters or parties",  minQty: 5,   qtyStep: 5 },
  { id: "r-chk-buff",         name: "Chicken Buffalo Wings",                 category: "Chicken",       price: 79.99,  unit: "kg",   note: "Any quantity • Great for platters or parties" },
  { id: "r-chk-buff-mar",     name: "Chicken Buffalo Wings, Marinated",      category: "Chicken",       price: 69.99,  unit: "kg",   note: "70% wings / 30% sauce — any quantity • Lemon & Herb / BBQ / Peri Peri" },
  { id: "r-chk-thighs",       name: "Chicken Thighs",                        category: "Chicken",       price: 54.99,  unit: "kg",   note: "Sold in 5kg bags • Great for roasting chicken",                          minQty: 5,   qtyStep: 5 },
  { id: "r-chk-drums",        name: "Chicken Drumsticks",                    category: "Chicken",       price: 69.99,  unit: "kg",   note: "Sold in 5kg bags • Great for roasting chicken",                          minQty: 5,   qtyStep: 5 },
  { id: "r-chk-whole",        name: "Whole Chicken (1–1.3kg)",               category: "Chicken",       price: 54.99,  unit: "kg",   note: "Wrapped individually — approx 1–1.3kg per bird • Nice sizes for rotisserie chicken", minQty: 1, qtyStep: 1 },
  { id: "r-chk-stew",         name: "Chicken Stew",                          category: "Chicken",       price: 69.99,  unit: "kg",   note: "Any quantity or 700g trays • Great for stew" },
  { id: "r-chk-braai",        name: "Chicken Braaipack (5 pc)",              category: "Chicken",       price: 59.99,  unit: "kg",   note: "5 piece — drum and thigh" },

  // ── Beef ──────────────────────────────────────────────────────────────────
  { id: "r-beef-sir-whole",   name: "Beef Sirloin, Whole",                   category: "Beef",          price: 179.99, unit: "kg",   note: "Whole sirloin — 3–8kg, price per kg • Cut your own steaks",             minQty: 3,   maxQty: 8,   qtyStep: 0.5 },
  { id: "r-beef-sir-cut",     name: "Beef Sirloin, Cut to Size",             category: "Beef",          price: 199.99, unit: "kg",   note: "Cut size requested — made on order • We cut & vac-pack individually",    minQty: 0.5,              qtyStep: 0.1 },
  { id: "r-beef-rump",        name: "Beef Rump Tail Steaks",                 category: "Beef",          price: 139.99, unit: "kg",   note: "Single vacuum pack, 300g–1.8kg — specify weight • Cooked as a steak or great for kebabs", minQty: 0.3, maxQty: 1.8, qtyStep: 0.1 },
  { id: "r-beef-mince-80",    name: "Beef Steak Mince 80/20",                category: "Beef",          price:  89.99, unit: "kg",   note: "Sold in vacuumed 5kg bags • Great for smash burgers or lasagne",         minQty: 5,   qtyStep: 5 },
  { id: "r-beef-mince-90",    name: "Beef Steak Lean Mince 90/10",           category: "Beef",          price:  99.99, unit: "kg",   note: "Sold in vacuumed 5kg bags • Great for a filling or lasagne",            minQty: 5,   qtyStep: 5 },
  { id: "r-beef-mince-95",    name: "Beef Steak Ultra Lean Mince",           category: "Beef",          price: 114.99, unit: "kg",   note: "Any quantity — made on order • When you need that extra lean mince" },
  { id: "r-beef-shin",        name: "Beef Boneless Shin",                    category: "Beef",          price: 119.99, unit: "kg",   note: "Vacuumed bags — 3.5–13kg, price per kg • Pulled beef, boneless stew",   minQty: 3.5, maxQty: 13,  qtyStep: 0.5 },
  { id: "r-beef-tender",      name: "Beef Tenderize Steak",                  category: "Beef",          price: 129.99, unit: "kg",   note: "Any quantity — made on order • Nice and lean, good for a lot" },
  { id: "r-beef-roast",       name: "Beef Roast",                            category: "Beef",          price: 114.99, unit: "kg",   note: "Whole roast — 3–6.5kg, price per kg • Great to make sliced beef roast (not fatty)", minQty: 3, maxQty: 6.5, qtyStep: 0.5 },
  { id: "r-beef-goulash",     name: "Beef Goulash / Strips",                 category: "Beef",          price: 129.99, unit: "kg",   note: "Any quantity • Stews, pies, stroganoff" },
  { id: "r-beef-stewmix",     name: "Beef Stew Mix",                         category: "Beef",          price: 110.00, unit: "kg",   note: "Any quantity • Whole beef nek 60% + 40% goulash — stew pieces" },
  { id: "r-beef-wors",        name: "Boerewors",                             category: "Beef",          price: 109.99, unit: "kg",   note: "Packed in 400g–1kg trays — specify weight • Braai!",                     minQty: 0.4,              qtyStep: 0.1 },

  // ── Lamb & Mutton ─────────────────────────────────────────────────────────
  { id: "r-lamb-a0",          name: "Lamb A0 (Whole or Half)",               category: "Lamb",          price: 129.99, unit: "kg",   note: "Cut any way you want • Nice lean lamb, not fatty at all" },
  { id: "r-lamb-a2",          name: "Lamb A2 (Whole or Half)",               category: "Lamb",          price: 139.99, unit: "kg",   note: "Cut any way you want • Good for spit braai or good fat content" },
  { id: "r-lamb-roast",       name: "Lean Lamb Roast Cut",                   category: "Lamb",          price: 145.99, unit: "kg",   note: "Any • Lamb roast lean" },
  { id: "r-lamb-ribs",        name: "A1/2 Lamb Ribs or Riblets",             category: "Lamb",          price: 119.99, unit: "kg",   note: "Any • Best lamb ribs — perfect amount of fat" },
  { id: "r-lamb-kidneys",     name: "Lamb Kidneys",                          category: "Lamb",          price:  50.00, unit: "kg",   note: "Cut or whole • For cooking or braai" },
  { id: "r-lamb-braai",       name: "Lamb Braai Chops",                      category: "Lamb",          price: 165.00, unit: "kg",   note: "Any • Braai" },
  { id: "r-lamb-loin",        name: "Lamb Loin Chops",                       category: "Lamb",          price: 180.00, unit: "kg",   note: "Any • Braai" },
  { id: "r-lamb-leg",         name: "Lamb Leg",                              category: "Lamb",          price: 169.99, unit: "kg",   note: "Cut or whole • Leg roast" },
  { id: "r-mutton-braai",     name: "Mutton Braai Chops",                    category: "Lamb",          price: 0,      priceLabel: "N/S", unit: "kg", note: "Any • Braai" },
  { id: "r-mutton-loin",      name: "Mutton Loin Chops",                     category: "Lamb",          price: 0,      priceLabel: "N/S", unit: "kg", note: "Any • Braai" },
  { id: "r-mutton-leg",       name: "Mutton Leg",                            category: "Lamb",          price: 0,      priceLabel: "N/S", unit: "kg", note: "Cut or whole • Leg roast" },

  // ── Ostrich ───────────────────────────────────────────────────────────────
  { id: "r-ost-goulash",      name: "Ostrich Goulash",                       category: "Ostrich",       price:  95.00, unit: "kg",   note: "Ostrich cubes/strips • Stews, pies, stroganoff (great price)" },
  { id: "r-ost-steaks",       name: "Ostrich Steaks",                        category: "Ostrich",       price: 100.00, unit: "kg",   note: "Cut to size requested — made on order • Nice lean, no fat steaks", minQty: 0.5, qtyStep: 0.1 },
  { id: "r-ost-mince",        name: "Ostrich Mince (Code 300)",              category: "Ostrich",       price:  85.00, unit: "kg",   note: "Made with beef fat • Made with your budget in mind" },

  // ── Fish ──────────────────────────────────────────────────────────────────
  { id: "r-fish-hake",        name: "Hake Steaks",                           category: "Fish",          price: 139.99, unit: "kg",   note: "100g–330g individually wrapped • Made on order • Great to make your own battered fish or just nice size pieces to cook" },
  { id: "r-fish-finger",      name: "Fish Fingers",                          category: "Fish",          price:  20.00, unit: "each", note: "25g fish fingers • Made on order • For the kids" },
  { id: "r-fish-cakes",       name: "Fish Cakes",                            category: "Fish",          price:  18.00, unit: "each", note: "50g cakes • Made on order • For the kids" },

  // ── Ready to Cook ─────────────────────────────────────────────────────────
  { id: "r-prep-ost-port",    name: "Ostrich Steaks Portioned",              category: "Ready to Cook", price: 40.00,  unit: "each", note: "270g–300g" },
  { id: "r-prep-wagyu",       name: "Beef Wagyu Burgers",                    category: "Ready to Cook", price: 30.00,  unit: "each", note: "150g–130mm" },
  { id: "r-prep-wors-bf",     name: "Boerewors Breakfast",                   category: "Ready to Cook", price: 10.50,  unit: "each", note: "80g–100g / 15cm" },
  { id: "r-prep-wors-hd",     name: "Boerewors Hotdog",                      category: "Ready to Cook", price: 11.50,  unit: "each", note: "100g–120g / 15cm" },
  { id: "r-prep-wors-ft",     name: "Boerewors Footlong",                    category: "Ready to Cook", price: 15.00,  unit: "each", note: "130g–150g / 22cm" },
  { id: "r-prep-beef-mball",  name: "Beef Meatballs 40G",                    category: "Ready to Cook", price:  4.00,  unit: "each", note: "40g • In stock" },
  { id: "r-prep-beef-gmball", name: "Beef Gourmet Meatballs 40G",            category: "Ready to Cook", price:  4.00,  unit: "each", note: "40g • Made on order" },
  { id: "r-prep-beef-patty-l",name: "Beef Patties (150g)",                   category: "Ready to Cook", price: 15.00,  unit: "each", note: "150g–130mm" },
  { id: "r-prep-beef-patty-s",name: "Beef Patties (120g)",                   category: "Ready to Cook", price: 12.00,  unit: "each", note: "120g–100mm" },
  { id: "r-prep-jalapeno",    name: "Beef Jalapeño Cheese Patties",          category: "Ready to Cook", price: 12.00,  unit: "each", note: "100g–100mm" },
  { id: "r-prep-bbq-patty",   name: "Beef BBQ Cheese Patties",               category: "Ready to Cook", price: 12.00,  unit: "each", note: "120g–100mm • Made on order" },
  { id: "r-prep-beef-kb60",   name: "Beef Steak Kebab 60G",                  category: "Ready to Cook", price: 12.00,  unit: "each", note: "Rump steak with green pepper & onions • Made on order" },
  { id: "r-prep-beef-kb100",  name: "Beef Steak Kebab 100G",                 category: "Ready to Cook", price: 20.00,  unit: "each", note: "Rump steak with green pepper & onions • Made on order" },
  { id: "r-prep-beef-kb200",  name: "Beef Steak Kebab 200G",                 category: "Ready to Cook", price: 40.00,  unit: "each", note: "Rump steak with green pepper & onions • Made on order" },
  { id: "r-prep-chk-patty",   name: "Chicken Patties",                       category: "Ready to Cook", price:  7.50,  unit: "each", note: "120g–100mm" },
  { id: "r-prep-chk-mball",   name: "Chicken Meatballs 40G",                 category: "Ready to Cook", price: 0,      priceLabel: "N/S", unit: "each", note: "40g • Made on order" },
  { id: "r-prep-chk-kb60",    name: "Chicken Fillet Kebab 60G",              category: "Ready to Cook", price: 10.00,  unit: "each", note: "Chicken fillet with green pepper & onions • Made on order" },
  { id: "r-prep-chk-kb100",   name: "Chicken Fillet Kebab 100G",             category: "Ready to Cook", price: 14.00,  unit: "each", note: "Chicken fillet with green pepper & onions • Made on order" },
  { id: "r-prep-chk-kb200",   name: "Chicken Fillet Kebab 200G",             category: "Ready to Cook", price: 28.00,  unit: "each", note: "Chicken fillet with green pepper & onions • Made on order" },
  { id: "r-prep-chk-med",     name: "Chicken Fillet Medium",                 category: "Ready to Cook", price: 13.00,  unit: "each", note: "140g–160g per unit • In stock" },
  { id: "r-prep-chk-lrg",     name: "Chicken Fillet Large",                  category: "Ready to Cook", price: 17.00,  unit: "each", note: "165g–205g per unit • In stock" },
  { id: "r-prep-leg-med",     name: "Chicken Leg Quarter Medium",            category: "Ready to Cook", price: 17.50,  unit: "each", note: "240g–275g per unit • In stock" },
  { id: "r-prep-leg-lrg",     name: "Chicken Leg Quarter Large",             category: "Ready to Cook", price: 18.50,  unit: "each", note: "280g–305g per unit • In stock" },
  { id: "r-prep-leg-xl",      name: "Chicken Leg Quarter XLarge",            category: "Ready to Cook", price: 20.00,  unit: "each", note: "310g–335g per unit • In stock" },

  // ── Cheese & Pantry ───────────────────────────────────────────────────────
  { id: "r-ch-mozloaf",       name: "Mozzarella Loaf",                       category: "Cheese & Pantry", price: 124.99, unit: "kg", note: "Sold as approx 2.5kg loaf — price per kg",         minQty: 2.5, qtyStep: 2.5 },
  { id: "r-ch-mozgr",         name: "Mozzarella Grated",                     category: "Cheese & Pantry", price: 109.99, unit: "kg", note: "Sold in 2kg bags — price per kg • Pizza topping",  minQty: 2,   qtyStep: 2 },
  { id: "r-ch-chedgr",        name: "Cheddar Grated",                        category: "Cheese & Pantry", price: 109.99, unit: "kg", note: "Sold in 2kg bags — price per kg",                  minQty: 2,   qtyStep: 2 },
  { id: "r-ch-chedloaf",      name: "Cheddar Loaf",                          category: "Cheese & Pantry", price: 124.99, unit: "kg", note: "Sold as approx 2.5kg loaf — price per kg",         minQty: 2.5, qtyStep: 2.5 },
  { id: "r-ch-gouda",         name: "Gouda Loaf",                            category: "Cheese & Pantry", price: 124.99, unit: "kg", note: "Sold in 2kg bags — price per kg",                  minQty: 2,   qtyStep: 2 },
  { id: "r-ch-pizza",         name: "Pizza Grated Mix",                      category: "Cheese & Pantry", price: 109.99, unit: "kg", note: "Sold in 2kg bags — price per kg • Pizza topping",  minQty: 2,   qtyStep: 2 },
  { id: "r-ch-slices",        name: "Cheddar Cheese Slices",                 category: "Cheese & Pantry", price: 0,      priceLabel: "N/S", unit: "kg", note: "112 slices per pack • Nice for burgers" },
  { id: "r-eggs-30",          name: "Eggs Large (30)",                       category: "Cheese & Pantry", price:  69.99, unit: "each", note: "Eggs wrapped • No VAT • Baking or breakfast needs" },
  { id: "r-eggs-18",          name: "Eggs Large (18)",                       category: "Cheese & Pantry", price:  44.99, unit: "each", note: "Eggs wrapped • No VAT • Baking or breakfast needs" },
  { id: "r-eggs-6",           name: "Eggs Large (6)",                        category: "Cheese & Pantry", price:  16.00, unit: "each", note: "Eggs wrapped • No VAT • Baking or breakfast needs" },
  { id: "r-chips-frz",        name: "Potato Chips Frozen 10mm (2.5kg)",      category: "Cheese & Pantry", price:  30.00, unit: "each", note: "No VAT • Oil frying / air frying / oven bake" },
  { id: "r-chips-fresh",      name: "Potato Chips Fresh (1kg)",              category: "Cheese & Pantry", price:  30.00, unit: "each", note: "Frozen 10mm • No VAT • Made on order • Oil frying chips" },
  { id: "r-veg-country",      name: "Frozen Veg (Country Crop)",             category: "Cheese & Pantry", price:  35.00, unit: "each", note: "1kg bags • Good for stew or roast veggies" },
  { id: "r-veg-mix",          name: "Frozen Veg (Mix Veg)",                  category: "Cheese & Pantry", price:  30.00, unit: "each", note: "1kg bags • Good for stew" },
  { id: "r-mince-ground",     name: "Ground Beef Style Mince",               category: "Cheese & Pantry", price:  30.00, unit: "kg",   note: "Sold in 1kg bags — price per kg • Made with your budget in mind", minQty: 1, qtyStep: 1 },

  // ── Budget Items ──────────────────────────────────────────────────────────
  { id: "r-bdg-chk-necks-1",  name: "Chicken Necks (1kg)",                   category: "Budget Items",  price: 30.00,  unit: "each", note: "1kg bags" },
  { id: "r-bdg-chk-necks-s",  name: "Chicken Necks 280G",                    category: "Budget Items",  price: 10.00,  unit: "each", note: "Packed in trays 280g • For smaller portions or resale" },
  { id: "r-bdg-chk-liver-1",  name: "Chicken Liver (1kg)",                   category: "Budget Items",  price: 30.00,  unit: "each", note: "1kg bags" },
  { id: "r-bdg-chk-liver-s",  name: "Chicken Liver 270G",                    category: "Budget Items",  price: 10.00,  unit: "each", note: "Packed in trays 270g • For smaller portions or resale" },
  { id: "r-bdg-giz-1",        name: "Chicken Gizzards/Magies (1kg)",         category: "Budget Items",  price: 45.00,  unit: "each", note: "1kg bags" },
  { id: "r-bdg-giz-s",        name: "Chicken Gizzards/Magies 250G",          category: "Budget Items",  price: 15.00,  unit: "each", note: "Packed in trays 250g • For smaller portions or resale" },
  { id: "r-bdg-skins-1",      name: "Chicken Skins (1kg)",                   category: "Budget Items",  price: 30.00,  unit: "each", note: "1kg bags" },
  { id: "r-bdg-skins-s",      name: "Chicken Skins 300G",                    category: "Budget Items",  price: 10.00,  unit: "each", note: "Packed in trays 300g • For smaller portions or resale" },
  { id: "r-bdg-chunks-1",     name: "Chicken Chunks (1kg)",                  category: "Budget Items",  price: 30.00,  unit: "each", note: "1kg bags" },
  { id: "r-bdg-chunks-s",     name: "Chicken Chunks 300G",                   category: "Budget Items",  price: 10.00,  unit: "each", note: "Packed in trays 300g • For smaller portions or resale" },
  { id: "r-bdg-bones",        name: "Wild Meaty Bones (Any)",                category: "Budget Items",  price: 28.00,  unit: "each", note: "Any size" },
  { id: "r-bdg-bones-s",      name: "Wild Meaty Bones 700G",                 category: "Budget Items",  price: 20.00,  unit: "each", note: "Packed in trays 700g • For smaller portions or resale" },
  { id: "r-bdg-gbf-patty",    name: "Ground Beef Style Patties (80G×4)",     category: "Budget Items",  price: 16.00,  unit: "each", note: "80g 100mm × 4, wrapped • Can be packed in trays for resale" },
  { id: "r-bdg-gbf-mball",    name: "Ground Beef Style Meatballs (40G×6)",   category: "Budget Items",  price: 12.00,  unit: "each", note: "40g × 6 meatballs, wrapped • Can be packed in trays for resale" },
  { id: "r-bdg-gbf-mince",    name: "Ground Beef Style Mince 300G",          category: "Budget Items",  price: 10.00,  unit: "each", note: "300g trays • For smaller portions or resale" },
  { id: "r-bdg-pol-250",      name: "French Polony 250G",                    category: "Budget Items",  price: 10.00,  unit: "each", note: "250g roll • Ready to eat" },
  { id: "r-bdg-pol-garl",     name: "Garlic French Polony 250G",             category: "Budget Items",  price: 10.00,  unit: "each", note: "250g roll • Ready to eat" },
  { id: "r-bdg-pol-chk",      name: "Chicken Polony 250G",                   category: "Budget Items",  price: 10.00,  unit: "each", note: "250g roll • Ready to eat" },
  { id: "r-bdg-pol-1.8",      name: "French Polony 1.8kg",                   category: "Budget Items",  price: 75.00,  unit: "each", note: "1.8kg roll • Ready to eat / great for sandwiches" },
];

// ---------------------------------------------------------------------------
// WHOLESALE (prices incl. VAT)
// ---------------------------------------------------------------------------
export const WHOLESALE_PRODUCTS: Product[] = [

  // ── Chicken ───────────────────────────────────────────────────────────────
  { id: "w-chk-fillet",       name: "Chicken Fillet",                        category: "Chicken",       price: 68.99,  unit: "kg",   note: "Sold in 5kg bags • Lean fillet for whatever you need",                  minQty: 5,   qtyStep: 5 },
  { id: "w-chk-fillet-pc",    name: "Chicken Fillet Pieces",                 category: "Chicken",       price: 74.74,  unit: "kg",   note: "Cut smaller than 1cm by hand • Perfect for pizza toppings" },
  { id: "w-chk-wings",        name: "Chicken Wings",                         category: "Chicken",       price: 73.59,  unit: "kg",   note: "Individually frozen — sold in 5kg bags • Great for platters or parties",  minQty: 5,   qtyStep: 5 },
  { id: "w-chk-buff",         name: "Chicken Buffalo Wings",                 category: "Chicken",       price: 80.49,  unit: "kg",   note: "Any quantity • Great for platters or parties" },
  { id: "w-chk-buff-mar",     name: "Chicken Buffalo Wings, Marinated",      category: "Chicken",       price: 71.29,  unit: "kg",   note: "70% wings / 30% sauce — any quantity • Great for platters or parties" },
  { id: "w-chk-thighs",       name: "Chicken Thighs",                        category: "Chicken",       price: 59.79,  unit: "kg",   note: "Sold in 5kg bags • Great for roasting chicken",                          minQty: 5,   qtyStep: 5 },
  { id: "w-chk-drums",        name: "Chicken Drumsticks",                    category: "Chicken",       price: 74.74,  unit: "kg",   note: "Sold in 5kg bags • Great for roasting chicken",                          minQty: 5,   qtyStep: 5 },
  { id: "w-chk-whole",        name: "Whole Chicken (1–1.3kg)",               category: "Chicken",       price: 55.19,  unit: "kg",   note: "Wrapped individually — approx 1–1.3kg per bird • Nice sizes for rotisserie chicken", minQty: 1, qtyStep: 1 },
  { id: "w-chk-stew",         name: "Chicken Stew",                          category: "Chicken",       price: 59.79,  unit: "kg",   note: "Any quantity or 700g trays • Great for stew" },

  // ── Beef ──────────────────────────────────────────────────────────────────
  { id: "w-beef-karan-wh",    name: "(Karan) Beef Sirloin, Whole",           category: "Beef",          price: 195.49, unit: "kg",   note: "Whole sirloin — 3–8kg, price per kg • Cut your own steaks",             minQty: 3,   maxQty: 8,   qtyStep: 0.5 },
  { id: "w-beef-karan-cut",   name: "(Karan) Beef Sirloin, Cut",             category: "Beef",          price: 229.99, unit: "kg",   note: "Cut size requested — made on order • We cut & vac-pack individually",    minQty: 0.5,              qtyStep: 0.1 },
  { id: "w-beef-sparta-wh",   name: "(Sparta) Beef Sirloin, Whole",          category: "Beef",          price: 172.49, unit: "kg",   note: "Whole sirloin — 3–8kg, price per kg • Cut your own steaks",             minQty: 3,   maxQty: 8,   qtyStep: 0.5 },
  { id: "w-beef-sparta-cut",  name: "(Sparta) Beef Sirloin, Cut",            category: "Beef",          price: 206.99, unit: "kg",   note: "Cut size requested — made on order • We cut & vac-pack individually",    minQty: 0.5,              qtyStep: 0.1 },
  { id: "w-beef-rump",        name: "Beef Rump Tail Steaks",                 category: "Beef",          price: 137.99, unit: "kg",   note: "Single vacuum pack, 300g–1.8kg — specify weight • Cooked as a steak or great for kebabs", minQty: 0.3, maxQty: 1.8, qtyStep: 0.1 },
  { id: "w-beef-tender",      name: "Beef Tenderize Steak",                  category: "Beef",          price: 137.99, unit: "kg",   note: "Any quantity • Nice and lean, good for a lot" },
  { id: "w-beef-roast",       name: "Beef Roast",                            category: "Beef",          price: 126.49, unit: "kg",   note: "Whole roast — 3–6.5kg, price per kg • Beef no fat clean",               minQty: 3,   maxQty: 6.5, qtyStep: 0.5 },
  { id: "w-beef-goulash",     name: "Beef Goulash or Strips",                category: "Beef",          price: 120.74, unit: "kg",   note: "Any quantity • Stews, pies, stroganoff" },
  { id: "w-beef-shin",        name: "Beef Soft Shin",                        category: "Beef",          price: 109.24, unit: "kg",   note: "Vacuumed bags — 3.5–13kg, price per kg • Pulled beef, boneless stew",   minQty: 3.5, maxQty: 13,  qtyStep: 0.5 },
  { id: "w-beef-stew",        name: "Beef Stew",                             category: "Beef",          price:  80.49, unit: "kg",   note: "Any quantity • Nice and good for stew and budget friendly" },
  { id: "w-beef-nek-stew",    name: "Beef Nek & Soft Shin Stew Mix",         category: "Beef",          price:  97.74, unit: "kg",   note: "Any quantity • Stew more meaty — recommended great beef flavour" },

  // ── Minces ────────────────────────────────────────────────────────────────
  { id: "w-mince-80",         name: "Beef Steak Mince 80/20",                category: "Minces",        price:  86.24, unit: "kg",   note: "Sold in vacuumed 5kg bags • Great for smash burgers or lasagne",   minQty: 5, qtyStep: 5 },
  { id: "w-mince-90",         name: "Beef Steak Lean Mince 90/10",           category: "Minces",        price:  97.74, unit: "kg",   note: "Sold in vacuumed 5kg bags • Great for a filling or lasagne",       minQty: 5, qtyStep: 5 },
  { id: "w-mince-95",         name: "Beef Steak Ultra Lean Mince 95/5",      category: "Minces",        price: 109.24, unit: "kg",   note: "Any quantity — made on order • When you need that extra lean mince" },
  { id: "w-mince-ground",     name: "Ground Beef Style Mince",               category: "Minces",        price:  30.00, unit: "kg",   note: "Sold in 1kg bags — price per kg • Made with your budget in mind",  minQty: 1, qtyStep: 1 },

  // ── Ostrich ───────────────────────────────────────────────────────────────
  { id: "w-ost-goulash",      name: "Ostrich Goulash",                       category: "Ostrich",       price: 91.99,  unit: "kg",   note: "Ostrich cubes/strips • Stews, pies, stroganoff (great price)" },
  { id: "w-ost-steaks",       name: "Ostrich Steaks",                        category: "Ostrich",       price: 103.49, unit: "kg",   note: "Cut to size requested — made on order • Nice lean, no fat steaks", minQty: 0.5, qtyStep: 0.1 },

  // ── Lamb ──────────────────────────────────────────────────────────────────
  { id: "w-lamb-a0",          name: "Lamb A0",                               category: "Lamb",          price: 139.14, unit: "kg",   note: "Cut any way you want • Nice lean lamb, not fatty at all" },
  { id: "w-lamb-a2",          name: "Lamb A2",                               category: "Lamb",          price: 149.49, unit: "kg",   note: "Cut any way you want • Good for spit braai" },
  { id: "w-lamb-roast",       name: "Lean Lamb Roast Cut",                   category: "Lamb",          price: 149.49, unit: "kg",   note: "Any • Lamb roast lean" },
  { id: "w-lamb-ribs",        name: "A1/2 Lamb Ribs or Riblets",             category: "Lamb",          price: 114.99, unit: "kg",   note: "Any • Best lamb ribs — perfect amount of fat" },
  { id: "w-lamb-kidneys",     name: "Lamb Kidneys, Cut",                     category: "Lamb",          price:  45.99, unit: "kg",   note: "Any • Can be sold whole — we cut for pie shops" },

  // ── Cheese ────────────────────────────────────────────────────────────────
  { id: "w-ch-mozloaf",       name: "Mozzarella Loaf",                       category: "Cheese",        price: 124.99, unit: "kg",   note: "Sold as approx 2.5kg loaf — price per kg",        minQty: 2.5, qtyStep: 2.5 },
  { id: "w-ch-mozgr",         name: "Mozzarella Grated",                     category: "Cheese",        price: 109.24, unit: "kg",   note: "Sold in 2kg bags — price per kg • Pizza topping", minQty: 2,   qtyStep: 2 },
  { id: "w-ch-chedgr",        name: "Cheddar Grated",                        category: "Cheese",        price: 109.24, unit: "kg",   note: "Sold in 2kg bags — price per kg",                 minQty: 2,   qtyStep: 2 },
  { id: "w-ch-chedloaf",      name: "Cheddar Loaf",                          category: "Cheese",        price: 124.99, unit: "kg",   note: "Sold as approx 2.5kg loaf — price per kg",        minQty: 2.5, qtyStep: 2.5 },
  { id: "w-ch-gouda",         name: "Gouda Loaf",                            category: "Cheese",        price: 124.99, unit: "kg",   note: "Sold in 2kg bags — price per kg",                 minQty: 2,   qtyStep: 2 },
  { id: "w-ch-pizza",         name: "Pizza Grated Mix",                      category: "Cheese",        price: 109.24, unit: "kg",   note: "Sold in 2kg bags — price per kg • Pizza topping", minQty: 2,   qtyStep: 2 },
  { id: "w-ch-slices",        name: "Cheddar Cheese Slices",                 category: "Cheese",        price: 0,      priceLabel: "N/S", unit: "kg", note: "112 slices per pack • Nice for burgers" },

  // ── Fish ──────────────────────────────────────────────────────────────────
  { id: "w-fish-hake",        name: "Hake Steaks",                           category: "Fish",          price: 114.99, unit: "kg",   note: "100g–330g individually wrapped • Made on order • Great to make your own battered fish or just nice size pieces to cook" },
  { id: "w-fish-finger",      name: "Fish Fingers",                          category: "Fish",          price:   1.96, unit: "each", note: "25g fish fingers • Made on order • For the kids" },
  { id: "w-fish-cakes",       name: "Fish Cakes",                            category: "Fish",          price:   3.67, unit: "each", note: "50g cakes • Made on order • For the kids" },

  // ── Ready to Cook ─────────────────────────────────────────────────────────
  { id: "w-prep-ost-port",    name: "Ostrich Steaks Portioned",              category: "Ready to Cook", price: 34.49,  unit: "each", note: "270g–300g" },
  { id: "w-prep-wagyu",       name: "Beef Wagyu Burgers",                    category: "Ready to Cook", price: 30.00,  unit: "each", note: "150g–130mm" },
  { id: "w-prep-wors-bf",     name: "Boerewors Breakfast",                   category: "Ready to Cook", price: 10.34,  unit: "each", note: "80g–100g / 15cm" },
  { id: "w-prep-wors-hd",     name: "Boerewors Hotdog",                      category: "Ready to Cook", price: 11.49,  unit: "each", note: "100g–120g / 15cm" },
  { id: "w-prep-wors-ft",     name: "Boerewors Footlong",                    category: "Ready to Cook", price: 13.79,  unit: "each", note: "130g–150g / 22cm" },
  { id: "w-prep-beef-mball",  name: "Beef Meatballs 40G",                    category: "Ready to Cook", price:  3.78,  unit: "each", note: "40g" },
  { id: "w-prep-beef-patty-l",name: "Beef Patties (150g)",                   category: "Ready to Cook", price: 13.79,  unit: "each", note: "150g–130mm" },
  { id: "w-prep-beef-patty-s",name: "Beef Patties (120g)",                   category: "Ready to Cook", price: 11.49,  unit: "each", note: "120g–100mm" },
  { id: "w-prep-jalapeno",    name: "Beef Jalapeño Cheese Patties",          category: "Ready to Cook", price: 11.49,  unit: "each", note: "100g–100mm" },
  { id: "w-prep-bbq-patty",   name: "Beef BBQ Cheese Patties",               category: "Ready to Cook", price: 11.49,  unit: "each", note: "100g–100mm • Made on order" },
  { id: "w-prep-chk-patty",   name: "Chicken Patties",                       category: "Ready to Cook", price:  8.04,  unit: "each", note: "120g–100mm" },
  { id: "w-prep-chk-mball",   name: "Chicken Meatballs 40G",                 category: "Ready to Cook", price:  3.44,  unit: "each", note: "40g • Made on order" },
  { id: "w-prep-beef-kb60",   name: "Beef Steak Kebab 60G",                  category: "Ready to Cook", price: 13.79,  unit: "each", note: "Rump steak with green pepper & onions • Made on order" },
  { id: "w-prep-beef-kb100",  name: "Beef Steak Kebab 100G",                 category: "Ready to Cook", price: 18.39,  unit: "each", note: "Rump steak with green pepper & onions • Made on order" },
  { id: "w-prep-beef-kb200",  name: "Beef Steak Kebab 200G",                 category: "Ready to Cook", price: 40.24,  unit: "each", note: "Rump steak with green pepper & onions • Made on order" },
  { id: "w-prep-chk-kb60",    name: "Chicken Fillet Kebab 60G",              category: "Ready to Cook", price:  9.19,  unit: "each", note: "Chicken fillet with green pepper & onions • Made on order" },
  { id: "w-prep-chk-kb100",   name: "Chicken Fillet Kebab 100G",             category: "Ready to Cook", price: 13.79,  unit: "each", note: "Chicken fillet with green pepper & onions • Made on order" },
  { id: "w-prep-chk-kb200",   name: "Chicken Fillet Kebab 200G",             category: "Ready to Cook", price: 27.59,  unit: "each", note: "Chicken fillet with green pepper & onions • Made on order" },
  { id: "w-prep-chk-med",     name: "Chicken Fillet Medium",                 category: "Ready to Cook", price: 11.49,  unit: "each", note: "140g–160g per unit • In stock" },
  { id: "w-prep-chk-lrg",     name: "Chicken Fillet Large",                  category: "Ready to Cook", price: 14.94,  unit: "each", note: "165g–205g per unit • In stock" },
  { id: "w-prep-leg-med",     name: "Chicken Leg Quarter Medium",            category: "Ready to Cook", price: 16.09,  unit: "each", note: "240g–275g per unit • In stock" },
  { id: "w-prep-leg-lrg",     name: "Chicken Leg Quarter Large",             category: "Ready to Cook", price: 18.39,  unit: "each", note: "280g–305g per unit • In stock" },
  { id: "w-prep-leg-xl",      name: "Chicken Leg Quarter XLarge",            category: "Ready to Cook", price: 18.96,  unit: "each", note: "310g–335g per unit • In stock" },

  // ── Bulk & Pantry ─────────────────────────────────────────────────────────
  { id: "w-bulk-chips-7",     name: "Chips (McCain) 7mm Frozen (Box 4×2.5kg)", category: "Bulk & Pantry", price: 34.99, unit: "each", note: "No VAT • Oil frying / air frying / oven bake" },
  { id: "w-bulk-chips-10",    name: "Chips (Golden River) 10mm Frozen (Box 4×2.5kg)", category: "Bulk & Pantry", price: 27.99, unit: "each", note: "No VAT • Oil frying / air frying / oven bake" },
  { id: "w-bulk-chips-fresh", name: "Potato Chips Fresh",                    category: "Bulk & Pantry", price: 14.99, unit: "kg",   note: "No VAT • Stays fresh for 5 days (7mm/8mm/10mm/12mm) • Made on order" },
  { id: "w-bulk-eggs",        name: "Eggs Large 30 × 12 (Tray Box)",         category: "Bulk & Pantry", price: 749.99, unit: "each", note: "No VAT • R2.42 per egg • Baking or breakfast needs" },
  { id: "w-bulk-veg-country", name: "Frozen Veg (Country Crop)",             category: "Bulk & Pantry", price: 35.00,  unit: "each", note: "1kg bags • No VAT • Good for stew or roast veggies" },
  { id: "w-bulk-veg-mix",     name: "Frozen Veg (Mix Veg)",                  category: "Bulk & Pantry", price: 30.00,  unit: "each", note: "1kg bags • No VAT • Good for stew" },
  { id: "w-bulk-chk-necks-1", name: "Chicken Necks (1kg)",                   category: "Bulk & Pantry", price: 28.74,  unit: "each", note: "1kg bags" },
  { id: "w-bulk-chk-necks-s", name: "Chicken Necks 280G",                    category: "Bulk & Pantry", price:  9.19,  unit: "each", note: "Packed in trays 280g • For smaller portions or resale" },
  { id: "w-bulk-chk-liver-1", name: "Chicken Liver (1kg)",                   category: "Bulk & Pantry", price: 27.59,  unit: "each", note: "1kg bags" },
  { id: "w-bulk-chk-liver-s", name: "Chicken Liver 270G",                    category: "Bulk & Pantry", price:  9.19,  unit: "each", note: "Packed in trays 270g • For smaller portions or resale" },
  { id: "w-bulk-giz-1",       name: "Chicken Gizzards/Maggies (1kg)",        category: "Bulk & Pantry", price: 41.39,  unit: "each", note: "1kg bags" },
  { id: "w-bulk-giz-s",       name: "Chicken Gizzards/Maggies 250G",         category: "Bulk & Pantry", price: 13.79,  unit: "each", note: "Packed in trays 250g • For smaller portions or resale" },
  { id: "w-bulk-skins-1",     name: "Chicken Skins (1kg)",                   category: "Bulk & Pantry", price: 28.74,  unit: "each", note: "1kg bags" },
  { id: "w-bulk-skins-s",     name: "Chicken Skins 300G",                    category: "Bulk & Pantry", price:  9.19,  unit: "each", note: "Packed in trays 300g • For smaller portions or resale" },
  { id: "w-bulk-chunks-1",    name: "Chicken Chunks (1kg)",                  category: "Bulk & Pantry", price: 28.74,  unit: "each", note: "1kg bags" },
  { id: "w-bulk-chunks-s",    name: "Chicken Chunks 300G",                   category: "Bulk & Pantry", price:  9.19,  unit: "each", note: "Packed in trays 300g • For smaller portions or resale" },
  { id: "w-bulk-wild-bones",  name: "Wild Meaty Bones (Any)",                category: "Bulk & Pantry", price: 26.44,  unit: "each", note: "Any size" },
  { id: "w-bulk-bones-s",     name: "Wild Meaty Bones 700G",                 category: "Bulk & Pantry", price: 20.00,  unit: "each", note: "Packed in trays 700g • For smaller portions or resale" },
  { id: "w-bulk-gbf-patty",   name: "Ground Beef Style Patties (40G Meatballs)", category: "Bulk & Pantry", price: 4.01, unit: "each", note: "40g meatballs • Can be packed in trays for resale" },
  { id: "w-bulk-gbf-mball",   name: "Ground Beef Style Meatballs (80G Patty)", category: "Bulk & Pantry", price: 2.00, unit: "each", note: "80g patty 100mm • Can be packed in trays for resale" },
  { id: "w-bulk-gbf-mince",   name: "Ground Beef Style Mince 300G",          category: "Bulk & Pantry", price:  9.19, unit: "each", note: "300g trays • For smaller portions or resale" },
  { id: "w-bulk-pol-250",     name: "French Polony 250G",                    category: "Bulk & Pantry", price:  9.19, unit: "each", note: "250g roll • Ready to eat" },
  { id: "w-bulk-pol-garl",    name: "Garlic French Polony 250G",             category: "Bulk & Pantry", price:  9.19, unit: "each", note: "250g roll • Ready to eat" },
  { id: "w-bulk-pol-chk",     name: "Chicken Polony 250G",                   category: "Bulk & Pantry", price:  9.19, unit: "each", note: "250g roll • Ready to eat" },
  { id: "w-bulk-polony",      name: "French Polony 1.8kg Roll",              category: "Bulk & Pantry", price: 60.94, unit: "each", note: "1.8kg roll • Ready to eat / great for sandwiches" },
];

export const CATEGORY_ORDER: Record<OrderType, string[]> = {
  retail:    ["Beef", "Lamb", "Chicken", "Ostrich", "Fish", "Ready to Cook", "Cheese & Pantry", "Budget Items"],
  wholesale: ["Beef", "Minces", "Lamb", "Chicken", "Ostrich", "Fish", "Cheese", "Ready to Cook", "Bulk & Pantry"],
};
