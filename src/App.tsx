import React, { useEffect, useRef, useState } from 'react';
import SpecialsBuilder from './admin/SpecialsBuilder';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageCircle,
  ChefHat,
  Award,
  Users,
  Flame,
  ArrowRight,
  Instagram,
  Facebook,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react';
import { CartProvider, useCart } from './shop/CartContext';
import { ShopSwitch, ShopGrid } from './shop/Shop';
import { CartDrawer } from './shop/CartDrawer';
import { CheckoutModal } from './shop/CheckoutModal';

// ============================================================================
// BUSINESS INFO CONFIGURATION
// Edit these values to update the site content globally.
// ============================================================================
const CONFIG = {
  BUSINESS_NAME: "Coleridge Meat",
  TAGLINE: "Premium cuts for Stellenbosch tables and braais",
  LOCATION_TEXT: "Stellenbosch, Western Cape",
  ADDRESS: "18 Tennant Rd, Cloetesville, Stellenbosch, 7599",
  PHONE: "061 127 5756",
  WHATSAPP: "https://wa.me/27611275756",
  EMAIL: "info@coleridgemeat.co.za",
  HOURS: "Mon-Fri: 8:00 AM - 6:00 PM\nSat: 8:00 AM - 2:00 PM\nSun: Closed",
  GOOGLE_MAPS_LINK: "https://maps.google.com/maps?q=18+Tennant+Rd+Cloetesville+Stellenbosch+7599",
  SOCIAL: {
    INSTAGRAM: "#",
    FACEBOOK: "#"
  }
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const shimmerEffect = {
  initial: { backgroundPosition: "200% 0" },
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const rotate3D = {
  initial: { rotateY: 0 },
  animate: {
    rotateY: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// ============================================================================
// COMPONENTS
// ============================================================================

const NAV_LINKS = [
  { href: "#about", label: "Story" },
  { href: "#selection", label: "Selection" },
  { href: "#spitbraai", label: "Spitbraai" },
  { href: "#shop", label: "Shop" },
  { href: "#contact", label: "Visit Us" },
];

const StickyNav = () => {
  const { count, openCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      if (y < heroHeight) {
        setVisible(false);
      } else if (y < lastY.current - 8) {
        setVisible(true);
      } else if (y > lastY.current + 4) {
        setVisible(false);
        setMenuOpen(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id) ?? document.getElementById("top");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={false}
      animate={{ y: visible ? 0 : "-100%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-[60] bg-stone-950/90 backdrop-blur-md border-b border-stone-800/60 shadow-xl shadow-stone-950/40"
    >
      <div className="px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Name */}
        <a href="#top" className="flex items-center gap-3">
          <span className="font-serif text-lg font-bold tracking-tight text-stone-100">
            {CONFIG.BUSINESS_NAME.toUpperCase()}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-7 text-xs font-medium tracking-widest uppercase text-stone-400">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="hover:text-stone-100 transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative border border-stone-700 text-stone-300 w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-800 hover:text-stone-100 transition-all duration-300"
          >
            <ShoppingBag size={15} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-burgundy-700 text-stone-100 text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-stone-950">
                {count}
              </span>
            )}
          </button>
          <a
            href="#shop"
            className="hidden sm:inline-block bg-burgundy-800 hover:bg-burgundy-700 text-stone-100 px-5 py-2 rounded-sm text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300"
          >
            Shop Online
          </a>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-300 hover:bg-stone-800 hover:text-stone-100 transition-all duration-300"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-stone-800/60"
          >
            <div className="px-6 py-4 flex flex-col gap-1 bg-stone-950/95">
              {NAV_LINKS.map(l => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="py-3 text-left text-sm font-medium tracking-widest uppercase text-stone-400 hover:text-stone-100 border-b border-stone-800/40 last:border-0 transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#shop")}
                className="mt-3 py-3 bg-burgundy-800 hover:bg-burgundy-700 text-stone-100 text-center rounded-sm text-[11px] font-semibold tracking-widest uppercase transition-colors"
              >
                Shop Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Navbar = () => {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id) ?? document.getElementById("top");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="px-6 py-8 md:px-12 flex justify-between items-center">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-stone-100">
            {CONFIG.BUSINESS_NAME.toUpperCase()}
          </span>
        </a>
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase text-stone-300">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative border border-stone-400/30 text-stone-100 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-stone-950 transition-all duration-300"
          >
            <ShoppingBag size={16} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-burgundy-700 text-stone-100 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-stone-950">
                {count}
              </span>
            )}
          </button>
          <a
            href="#shop"
            className="hidden sm:inline-block border border-stone-400/30 text-stone-100 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-stone-950 transition-all duration-300"
          >
            Shop Online
          </a>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 rounded-full border border-stone-400/30 flex items-center justify-center text-stone-100 hover:bg-white hover:text-stone-950 transition-all duration-300"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1 bg-stone-950/90 backdrop-blur-md border-t border-stone-800/40">
              {NAV_LINKS.map(l => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="py-3 text-left text-sm font-medium tracking-widest uppercase text-stone-300 hover:text-white border-b border-stone-800/40 last:border-0 transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#shop")}
                className="mt-3 py-3 bg-burgundy-800 hover:bg-burgundy-700 text-stone-100 text-center rounded-sm text-[11px] font-semibold tracking-widest uppercase transition-colors"
              >
                Shop Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://suffolkfoodhall.co.uk/wp-content/uploads/Sirloin-Steak.png"
          alt="Premium Halaal sirloin steak – Coleridge Meat butcher Stellenbosch"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/50 to-stone-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/20"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 border border-stone-500/30 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-stone-300 backdrop-blur-sm">
              Local Butchery • {CONFIG.LOCATION_TEXT}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-stone-100 leading-[1.1] mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            The finest cuts for<br className="hidden md:block" /> the local table.
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-12 font-light"
          >
            {CONFIG.TAGLINE}. Farm-raised quality, expertly prepared for your family meals and weekend gatherings.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#shop"
              className="w-full sm:w-auto px-8 py-4 bg-burgundy-800 text-stone-100 rounded-sm text-sm font-semibold tracking-widest uppercase hover:bg-burgundy-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Order Online
            </motion.a>
            <motion.a 
              href="#contact" 
              className="w-full sm:w-auto px-8 py-4 border border-stone-500/30 text-stone-100 rounded-sm text-sm font-semibold tracking-widest uppercase hover:bg-stone-100 hover:text-stone-950 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Strip */}
      <div className="absolute bottom-0 left-0 w-full border-t border-stone-800/50 bg-stone-950/80 backdrop-blur-md py-6 z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-4 md:gap-8 text-xs font-medium tracking-widest uppercase text-stone-400">
          <span className="flex items-center gap-2"><MapPin size={14} /> Stellenbosch-based</span>
          <span className="flex items-center gap-2"><Award size={14} /> Premium quality cuts</span>
          <span className="flex items-center gap-2"><ChefHat size={14} /> Farm-focused sourcing</span>
          <span className="flex items-center gap-2">
            <span className="text-base leading-none">☪</span> 100% Halaal
          </span>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" aria-label="About Coleridge Meat – premium butcher in Stellenbosch" className="py-24 md:py-32 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif text-stone-100 mb-8 leading-tight">
              A trusted local butcher built on quality and care.
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-6 text-stone-400 font-light text-lg">
              <p>
                At {CONFIG.BUSINESS_NAME}, we believe that great meals start with exceptional ingredients. Located in the heart of {CONFIG.LOCATION_TEXT}, we are dedicated to providing our community with the finest farm-to-table meats.
              </p>
              <p>
                Whether you're planning a quiet family dinner or a massive weekend braai, our focus is always on freshness, ethical sourcing, and expert preparation. We know our cuts, we know our farmers, and we take pride in serving our neighbors.
              </p>
              <div className="inline-flex items-center gap-3 mt-2 px-5 py-3 bg-stone-900 border border-stone-800 rounded-sm">
                <span className="text-2xl leading-none text-stone-300">☪</span>
                <div>
                  <div className="text-sm font-semibold text-stone-100 tracking-wide">100% Halaal Certified</div>
                  <div className="text-xs text-stone-400 mt-0.5">All meats slaughtered and handled according to Islamic dietary requirements.</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
              <img 
                src="https://images.pexels.com/photos/9424951/pexels-photo-9424951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Coleridge Meat butcher expertly cutting premium beef in Stellenbosch butchery"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient overlay to blend with background */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-stone-900 border border-stone-800 p-6 flex flex-col justify-center items-center rounded-full hidden md:flex">
              <span className="text-4xl font-serif text-burgundy-600 mb-1">Est.</span>
              <span className="text-xs tracking-widest uppercase text-stone-400 text-center">Local<br/>Tradition</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award className="w-8 h-8 text-burgundy-600" />,
      title: "Premium Quality",
      desc: "Carefully selected, farm-raised meats that guarantee tenderness and flavor."
    },
    {
      icon: <MapPin className="w-8 h-8 text-burgundy-600" />,
      title: "Local Service",
      desc: "Personalized advice and cuts tailored exactly to your cooking needs."
    },
    {
      icon: <Flame className="w-8 h-8 text-burgundy-600" />,
      title: "Braai-Ready",
      desc: "Expertly marinated options, thick-cut steaks, and our signature boerewors."
    },
    {
      icon: <Users className="w-8 h-8 text-burgundy-600" />,
      title: "Community First",
      desc: "Proudly serving Stellenbosch families, students, and local businesses."
    },
    {
      icon: <span className="text-3xl leading-none text-burgundy-600">☪</span>,
      title: "Halaal Certified",
      desc: "All our meats are 100% Halaal certified, slaughtered and handled according to Islamic dietary requirements."
    }
  ];

  return (
    <section className="py-24 bg-stone-900 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {reasons.map((reason, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="p-8 bg-stone-950 rounded-sm border border-stone-800/50 hover:border-burgundy-800/50 transition-colors group">
              <div className="mb-6 bg-stone-900 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-burgundy-900/20 transition-colors">
                {reason.icon}
              </div>
              <h3 className="text-xl font-serif text-stone-100 mb-3">{reason.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const OurSelection = () => {
  const categories = [
    { name: "Premium Beef", alt: "Premium beef cuts – sirloin, rump and mince from Coleridge Meat Stellenbosch", image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=2070&auto=format&fit=crop" },
    { name: "Lamb & Mutton", alt: "Fresh Halaal lamb chops and whole lamb from Coleridge Meat Stellenbosch butcher", image: "https://images.pexels.com/photos/13304044/pexels-photo-13304044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Quality Chicken", alt: "Farm-raised chicken fillets, wings and braai packs – Coleridge Meat Stellenbosch", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=2070&auto=format&fit=crop" },
    { name: "Ostrich Cuts", alt: "South African ostrich steaks and goulash available at Coleridge Meat Stellenbosch", image: "https://www.ostrichmeat.co.za/cdn/shop/products/OstrichFillet_763cf36b-262e-4328-b1ec-372881a22e66_1000x1000.jpg?v=1618494704" },
    { name: "Boerewors & Sausages", alt: "Signature Halaal boerewors and sausages made fresh at Coleridge Meat Stellenbosch", image: "https://winemag.co.za/wp-content/uploads/2014/10/grabouw-boerewors-recipe.jpg" },
    { name: "Braai Essentials", alt: "Braai meat essentials – chops, wors and marinated cuts from Coleridge Meat Stellenbosch", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" }
  ];

  return (
    <section id="selection" aria-label="Meat selection – beef, lamb, chicken and braai cuts in Stellenbosch" className="py-24 md:py-32 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-burgundy-600 mb-4">Our Selection</p>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100">Crafted for the table.</h2>
          <p className="mt-6 text-stone-400 max-w-2xl mx-auto">Explore our range of premium cuts, prepared daily by our expert butchers. Visit us in-store to see today's fresh selection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              variants={fadeInUp} 
              className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-burgundy-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img
                src={cat.image}
                alt={cat.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-300"></div>
              <motion.div 
                className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-2xl font-serif text-stone-100 group-hover:text-burgundy-200 transition-colors duration-300">{cat.name}</h4>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="text-burgundy-600" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedCuts = () => {
  const features = [
    {
      title: "Karan Beef Sirloin",
      alt: "Whole Karan beef sirloin cut to size at Coleridge Meat – premium beef butcher Stellenbosch",
      desc: "We stock whole Karan sirloins from 3 to 8kg, one of South Africa's most respected beef brands. Cut to the size you want and vacuum-sealed individually — perfect steaks, every time.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Signature Boerewors",
      alt: "Halaal boerewors made fresh at Coleridge Meat – the best boerewors in Stellenbosch",
      desc: "Our closely guarded house recipe. Perfectly spiced, coarsely ground, and essential for any authentic Stellenbosch braai.",
      image: "https://slaghuis.co.uk/wp-content/uploads/2019/01/boerewors1-jpg.webp"
    },
    {
      title: "Family Braai Packs",
      alt: "Family braai pack with chops, boerewors and chicken – Coleridge Meat Stellenbosch",
      desc: "Curated selections of chops, wors, and marinated chicken. Everything you need to feed the family, conveniently packed.",
      image: "https://images.pexels.com/photos/6607314/pexels-photo-6607314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-burgundy-600 mb-4">House Favourites</p>
            <h2 className="text-4xl font-serif text-stone-100">Karan Beef Sirloin & House Favourites</h2>
          </div>
          <a href="#contact" className="text-sm font-semibold tracking-widest uppercase text-stone-300 hover:text-white border-b border-burgundy-600 pb-1 transition-colors">
            Enquire for availability
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-stone-950 rounded-sm overflow-hidden border border-stone-800/50 group"
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
              }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 relative">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-burgundy-600 to-stone-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                  style={{ originX: 0 }}
                ></motion.div>
                <h4 className="text-2xl font-serif text-stone-100 mb-3 group-hover:text-burgundy-200 transition-colors duration-300">{item.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                <motion.a 
                  href="#contact" 
                  className="text-xs font-semibold tracking-widest uppercase text-burgundy-500 hover:text-burgundy-400 transition-colors flex items-center gap-2 inline-flex"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Ask in store <ArrowRight size={14} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpitbraaiFeature = () => {
  const packages = [
    { label: "Package 1", price: "R150", desc: "per person" },
    { label: "Package 2", price: "R165", desc: "per person" },
    { label: "Package 3", price: "R125", desc: "per person · budget option" },
  ];

  return (
    <section id="spitbraai" aria-label="Spitbraai catering service in Stellenbosch – Coleridge Meat" className="py-24 md:py-32 bg-stone-950 border-y border-stone-900 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-burgundy-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-sm order-2 lg:order-1"
          >
            <img
              src="https://images.squarespace-cdn.com/content/v1/564312e0e4b02d0ff72509f3/1469701298134-OSDZHXJI20YST448NP8W/skaap.jpg"
              alt="Whole Halaal lamb on a spit braai for events and functions – Coleridge Meat Stellenbosch"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/60 via-transparent to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-stone-950/80 border border-stone-800 backdrop-blur-sm rounded-sm">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 flex items-center gap-2">
                <span className="text-sm leading-none text-stone-300">☪</span> Fully Halaal Certified · ICSA Registered
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="order-1 lg:order-2"
          >
            <motion.div variants={fadeInUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-burgundy-600 mb-4">
              Specialty Offering
            </motion.div>
            <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-stone-100 leading-tight mb-2">
              Spit & Chill.
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-sm font-medium tracking-widest uppercase text-stone-500 mb-6">
              South African Spitbraai Experience
            </motion.p>
            <motion.p variants={fadeInUp} className="text-stone-400 leading-relaxed mb-8 max-w-lg">
              We come to your venue and spit the lamb onsite — live, over the fire, at your event. From family gatherings to large functions, our team sets up and handles everything at your location. Choose a package, tell us where and when, and we'll take care of the rest.
            </motion.p>

            {/* Pricing pills */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.label}
                  className="bg-stone-900 border border-stone-800 rounded-sm p-4 text-center hover:border-burgundy-800/60 transition-colors"
                >
                  <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-500 mb-1">{pkg.label}</div>
                  <div className="text-2xl font-serif text-stone-100">{pkg.price}</div>
                  <div className="text-[10px] text-stone-500 mt-1 leading-tight">{pkg.desc}</div>
                </div>
              ))}
            </motion.div>

            <motion.p variants={fadeInUp} className="text-xs text-stone-500 mb-8 leading-relaxed">
              Packages are fully customisable — changes may affect pricing. Please specify your event location when enquiring; events outside our standard area may carry a petrol charge.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-xs text-stone-500 mb-6 leading-relaxed">
              Contact Stefan directly to book or get a quote.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a
                href="https://wa.me/27611275756"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-burgundy-800 hover:bg-burgundy-700 text-stone-100 rounded-sm text-xs font-semibold tracking-widest uppercase transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={14} /> WhatsApp Stefan
              </motion.a>
              <motion.a
                href="mailto:stefan@coleridgemeat.co.za"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-stone-700 text-stone-300 rounded-sm text-xs font-semibold tracking-widest uppercase hover:border-stone-500 hover:text-stone-100 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Mail size={14} /> Email for a Quote
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const GoogleReviews = () => {
  const reviews = [
    {
      name: "Angelique Rispel",
      type: "Local Guide",
      reviews: "71 reviews",
      photos: "60 photos",
      time: "3 weeks ago",
      rating: 5,
      text: "Always great service, love their steaks. And meat is very affordable"
    },
    {
      name: "Michael Petersen",
      type: "Regular Customer",
      reviews: "23 reviews",
      photos: "15 photos",
      time: "2 weeks ago",
      rating: 5,
      text: "Best boerewors in Stellenbosch! Always fresh and the staff knows their stuff. Weekend braais just got better."
    },
    {
      name: "Sarah Johnson",
      type: "Local Resident",
      reviews: "45 reviews",
      photos: "32 photos",
      time: "1 month ago",
      rating: 5,
      text: "Quality is consistently excellent. Their dry-aged steaks are a game changer for dinner parties. Highly recommend!"
    },
    {
      name: "David Botha",
      type: "Regular Customer",
      reviews: "18 reviews",
      photos: "8 photos",
      time: "1 month ago",
      rating: 5,
      text: "Friendly service and amazing quality meats. The lamb chops are my favorite - always tender and flavorful."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-burgundy-600 mb-4">What Our Customers Say</p>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mb-4">Google Reviews</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-500 text-2xl">★</span>
            ))}
            <span className="text-stone-400 ml-2">4.8 out of 5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative bg-stone-900 rounded-sm border border-stone-800/50 p-8 hover:border-burgundy-800/50 transition-all duration-300 group overflow-hidden"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-burgundy-600 rounded-full flex items-center justify-center text-stone-100 font-semibold shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-stone-100 font-medium">{review.name}</h4>
                      <p className="text-stone-500 text-xs">{review.type} · {review.reviews} · {review.photos}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-stone-500 text-xs">{review.time}</span>
                  </div>
                </div>
              </div>
              <p className="text-stone-300 leading-relaxed group-hover:text-stone-200 transition-colors duration-300">{review.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href={`https://www.google.com/search?q=Coleridge+Meat+Stellenbosch+reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-stone-700 text-stone-300 rounded-sm text-sm font-semibold tracking-widest uppercase hover:bg-stone-800 transition-colors"
          >
            View All Reviews
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const CommunityTrust = () => {
  return (
    <section className="py-16 bg-burgundy-900 border-y border-burgundy-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex-1">
            <h4 className="text-xl font-serif text-stone-100 mb-2">Proudly Stellenbosch</h4>
            <p className="text-burgundy-200 text-sm">A community-minded local business built around fresh, dependable service.</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-burgundy-800"></div>
          <div className="flex-1">
            <h4 className="text-xl font-serif text-stone-100 mb-2">Quality-First Approach</h4>
            <p className="text-burgundy-200 text-sm">We never compromise on the sourcing or preparation of our meats.</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-burgundy-800"></div>
          <div className="flex-1">
            <h4 className="text-xl font-serif text-stone-100 mb-2">Expert Advice</h4>
            <p className="text-burgundy-200 text-sm">Not sure what cut you need? Our butchers are always ready to guide you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-stone-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-burgundy-600 mb-4">Visit Us</p>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mb-8">Stop by the shop.</h2>
            <p className="text-stone-400 mb-12 font-light text-lg">
              Whether you're looking for tonight's dinner or placing a large order for the weekend, we'd love to see you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-950 rounded-full flex items-center justify-center shrink-0 border border-stone-800">
                  <MapPin className="text-burgundy-500 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-stone-100 font-medium mb-1">Address</h4>
                  <p className="text-stone-400 text-sm">{CONFIG.ADDRESS}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-950 rounded-full flex items-center justify-center shrink-0 border border-stone-800">
                  <Clock className="text-burgundy-500 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-stone-100 font-medium mb-1">Opening Hours</h4>
                  <p className="text-stone-400 text-sm whitespace-pre-line">{CONFIG.HOURS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-950 rounded-full flex items-center justify-center shrink-0 border border-stone-800">
                  <Phone className="text-burgundy-500 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-stone-100 font-medium mb-1">Contact</h4>
                  <p className="text-stone-400 text-sm mb-1">{CONFIG.PHONE}</p>
                  <p className="text-stone-400 text-sm">{CONFIG.EMAIL}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a 
                href={`tel:${CONFIG.PHONE.replace(/[^0-9+]/g, '')}`} 
                className="px-6 py-3 bg-stone-100 text-stone-950 rounded-sm text-xs font-semibold tracking-widest uppercase hover:bg-stone-300 transition-colors flex items-center gap-2"
              >
                <Phone size={16} /> Call Now
              </a>
              <a 
                href={CONFIG.WHATSAPP} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-white rounded-sm text-xs font-semibold tracking-widest uppercase hover:bg-[#20bd5a] transition-colors flex items-center gap-2"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-stone-950 p-2 rounded-sm border border-stone-800 h-[400px] lg:h-auto min-h-[400px] relative flex items-center justify-center overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.123456789!2d18.859504!3d-33.934567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc7e5b8e2a2b2b%3A0x1234567890abcdef!2s18+Tennant+Rd+Cloetesville+Stellenbosch+7599!5e0!3m2!1sen!2sza!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
              className="rounded-sm"
              title="Google Maps - Coleridge Meat Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-950 pt-20 pb-10 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt="Coleridge Meat logo"
                className="h-12 w-auto object-contain mix-blend-screen"
              />
            </div>
            <p className="text-stone-400 text-sm max-w-sm leading-relaxed mb-6">
              {CONFIG.TAGLINE}. Providing Stellenbosch with premium, farm-raised meats and exceptional local service.
            </p>
            <div className="flex gap-4">
              <a href={CONFIG.SOCIAL.INSTAGRAM} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:bg-burgundy-900 hover:text-stone-100 transition-colors">
                <Instagram size={18} />
              </a>
              <a href={CONFIG.SOCIAL.FACEBOOK} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:bg-burgundy-900 hover:text-stone-100 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-stone-100 font-medium mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><a href="#about" className="hover:text-burgundy-500 transition-colors">Our Story</a></li>
              <li><a href="#selection" className="hover:text-burgundy-500 transition-colors">Our Selection</a></li>
              <li><a href="#spitbraai" className="hover:text-burgundy-500 transition-colors">Spitbraai</a></li>
              <li><a href="#shop" className="hover:text-burgundy-500 transition-colors">Shop Online</a></li>
              <li><a href="#contact" className="hover:text-burgundy-500 transition-colors">Visit Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-stone-100 font-medium mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>{CONFIG.ADDRESS}</li>
              <li>{CONFIG.PHONE}</li>
              <li>{CONFIG.EMAIL}</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <p>&copy; {new Date().getFullYear()} {CONFIG.BUSINESS_NAME}. All rights reserved.</p>
          <p>Designed for Stellenbosch.</p>
        </div>
      </div>
    </footer>
  );
};

// Hidden admin route — not linked from public nav
const ADMIN_HASH = '#cm-specials-portal';

function App() {
  const [isAdminRoute] = useState(
    () => window.location.hash === ADMIN_HASH
  );

  if (isAdminRoute) {
    return <SpecialsBuilder />;
  }

  return (
    <CartProvider>
    <div id="top" className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-burgundy-800 selection:text-stone-100">
      <StickyNav />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <OurSelection />
        <FeaturedCuts />
        <SpitbraaiFeature />
        <ShopSwitch />
        <ShopGrid />
        <GoogleReviews />
        <CommunityTrust />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      
      {/* Floating WhatsApp Button */}
      <motion.a
        href={CONFIG.WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Contact us on WhatsApp"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MessageCircle size={24} />
      </motion.a>
    </div>
    </CartProvider>
  );
}

export default App;
