import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Droplets, Minus, Mountain, Plus, ShoppingBag, Sparkles, Wind, X } from "lucide-react";
import "./styles.css";

const bottleImage = `${import.meta.env.BASE_URL}assets/sauvage-hero.jpg`;

const editions = [
  { id: "blue", name: "SAUVAGE BLUE", finish: "Midnight blue", color: "#3177a5", filter: "edition-blue" },
  { id: "red", name: "SAUVAGE RED", finish: "Crimson red", color: "#d64b52", filter: "edition-red" },
  { id: "yellow", name: "SAUVAGE YELLOW", finish: "Golden yellow", color: "#d5ad4b", filter: "edition-yellow" },
  { id: "white", name: "SAUVAGE WHITE", finish: "Icy white", color: "#d8e1e5", filter: "edition-white" }
];

const info = [
  {
    id: "opening",
    eyebrow: "01 — THE OPENING",
    title: "A fresh, electric first impression.",
    text: "A crisp burst of citrus opens the composition, creating the signature Sauvage freshness.",
    icon: Sparkles,
    side: "left",
    x: "10%",
    y: "28%"
  },
  {
    id: "heart",
    eyebrow: "02 — THE HEART",
    title: "Bergamot meets wild aromatics.",
    text: "The aromatic core develops with a cool, spicy character inspired by wide open landscapes.",
    icon: Wind,
    side: "right",
    x: "70%",
    y: "43%"
  },
  {
    id: "depth",
    eyebrow: "03 — THE DEPTH",
    title: "A darker, woody signature.",
    text: "Warm woods and amber-toned depth give the fragrance its long, memorable trail.",
    icon: Mountain,
    side: "left",
    x: "12%",
    y: "60%"
  },
  {
    id: "finish",
    eyebrow: "04 — THE FINISH",
    title: "A trail that stays with you.",
    text: "The dry-down becomes smoother and deeper, leaving a confident signature on skin.",
    icon: Droplets,
    side: "right",
    x: "69%",
    y: "69%"
  }
];

function ProductVisual({ scrollYProgress }) {
  const rawRotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-12, 8, -6, 9, -12]);
  const rawRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const rotateY = useSpring(rawRotateY, { stiffness: 90, damping: 18 });
  const rotateZ = useSpring(rawRotateZ, { stiffness: 90, damping: 18 });
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.76, 1.2]);

  return (
    <div className="product-stage">
      <motion.div className="product-shadow" style={{ scaleX: scale }} />

      <motion.div
        className="product-wrap"
        style={{ rotateY, rotateZ, y, scale }}
        whileHover={{ rotateX: -4, rotateY: 8, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        <div className="bottle-frame">
          <img src={bottleImage} alt="Dior Sauvage bottle" />
        </div>
      </motion.div>
    </div>
  );
}

function PurchaseProductVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const rotateY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [-14, 0, 14]),
    { stiffness: 80, damping: 20 }
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]),
    { stiffness: 80, damping: 20 }
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <div ref={ref} className="buy-product-position">
      <motion.div className="buy-product" style={{ rotateY, rotateZ, y }}>
        <img src={bottleImage} alt="Sauvage product" />
      </motion.div>
    </div>
  );
}

function EditionSelector({ selectedEdition, onSelect, onCheckout }) {
  return (
    <section id="editions" className="editions-section" aria-labelledby="editions-title">
      <div className="editions-heading">
        <div>
          <p className="kicker">FIND YOUR SIGNATURE</p>
          <h2 id="editions-title">Choose your<br /><i>edition.</i></h2>
        </div>
        <p className="editions-intro">Explore four color-finish concepts and select the one you like.</p>
      </div>

      <div className="edition-grid">
        {editions.map((edition, index) => {
          const isSelected = selectedEdition.id === edition.id;
          return (
            <button
              key={edition.id}
              type="button"
              className={`edition-card${isSelected ? " selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => {
                onSelect(edition);
                onCheckout();
              }}
            >
              <span className="edition-art">
                <span className="edition-art-glow" style={{ "--edition-color": edition.color }} />
                <img
                  className={edition.filter}
                  src={bottleImage}
                  alt={`${edition.finish} Sauvage bottle`}
                />
                <span className="edition-number">0{index + 1}</span>
                <span className="edition-check" aria-hidden="true"><Check size={13} /></span>
              </span>
              <span className="edition-details">
                <span>
                  <strong>{edition.name}</strong>
                  <small>{edition.finish}</small>
                </span>
                <span className="edition-swatch" style={{ "--edition-color": edition.color }} />
              </span>
              <span className="edition-action">{isSelected ? "SELECTED" : "SELECT EDITION"}</span>
            </button>
          );
        })}
      </div>

      <div className="edition-summary" aria-live="polite">
        <span className="edition-summary-swatch" style={{ "--edition-color": selectedEdition.color }} />
        <div>
          <span className="edition-summary-label">SELECTED FOR YOUR ORDER</span>
          <strong>{selectedEdition.name}</strong>
          <small>{selectedEdition.finish} color-finish concept</small>
        </div>
        <span className="edition-summary-state"><Check size={14} /> SELECTED</span>
        <button className="edition-checkout-button" type="button" onClick={onCheckout}>
          <ShoppingBag size={14} />
          <span>CHECKOUT</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
}

function CheckoutDialog({ edition, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isDemoComplete, setIsDemoComplete] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = event => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = event => {
    event.preventDefault();
    setIsDemoComplete(true);
  };

  return (
    <div className="checkout-overlay" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="checkout-dialog" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div className="checkout-topline">
          <span>SAUVAGE <i>·</i> CHECKOUT</span>
          <button ref={closeButtonRef} type="button" className="checkout-close" aria-label="Close checkout" onClick={onClose}>
            <X size={17} />
          </button>
        </div>

        {isDemoComplete ? (
          <div className="checkout-success" role="status">
            <span className="checkout-success-icon"><Check size={22} /></span>
            <p className="kicker">DEMO CHECKOUT</p>
            <h2 id="checkout-title">Your selection<br /><i>is ready.</i></h2>
            <p>This is a preview only. No order or payment was submitted.</p>
            <button type="button" className="checkout-submit" onClick={onClose}>BACK TO THE EXPERIENCE</button>
          </div>
        ) : (
          <>
            <div className="checkout-heading">
              <p className="kicker">YOUR SELECTION</p>
              <h2 id="checkout-title">Complete<br /><i>your order.</i></h2>
            </div>

            <div className="checkout-item">
              <div className="checkout-item-art">
                <img className={edition.filter} src={bottleImage} alt="" />
              </div>
              <div className="checkout-item-info">
                <span>EAU DE TOILETTE · COLOR CONCEPT</span>
                <strong>{edition.name}</strong>
                <small>{edition.finish}</small>
                <div className="checkout-quantity" aria-label="Quantity">
                  <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity(value => Math.max(1, value - 1))}><Minus size={13} /></button>
                  <span>{quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(value => value + 1)}><Plus size={13} /></button>
                </div>
              </div>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <label>
                NAME
                <input name="name" autoComplete="name" placeholder="Your name" required />
              </label>
              <label>
                EMAIL
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <p className="checkout-demo-note">Demo checkout only — no payment or order will be submitted.</p>
              <button className="checkout-submit" type="submit">
                <span>CONTINUE</span>
                <ArrowUpRight size={16} />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Connector({ side }) {
  return (
    <svg className={`connector connector-${side}`} viewBox="0 0 220 100" preserveAspectRatio="none" aria-hidden="true">
      <path d={side === "left" ? "M220 50 C160 50, 120 50, 0 50" : "M0 50 C60 50, 100 50, 220 50"} />
      <circle cx={side === "left" ? "3" : "217"} cy="50" r="4" />
    </svg>
  );
}

function InfoCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.article
      className={`info-card ${item.side}`}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ amount: 0.35, once: false }}
      transition={{ duration: 0.65, delay: index * 0.05 }}
    >
      <Connector side={item.side} />
      <div className="info-card-inner">
        <div className="info-icon"><Icon size={17} strokeWidth={1.5} /></div>
        <span>{item.eyebrow}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </motion.article>
  );
}

function App() {
  const experienceRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState(editions[0]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);
  const { scrollYProgress: experienceScrollProgress } = useScroll({
    target: experienceRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableDistance > 0 ? Math.round((window.scrollY / scrollableDistance) * 100) : 0;
      setScrollPercentage(current => current === progress ? current : progress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let currentScroll = window.scrollY;
    let targetScroll = currentScroll;
    let animationFrame = 0;

    const animateScroll = () => {
      currentScroll += (targetScroll - currentScroll) * 0.12;
      if (Math.abs(targetScroll - currentScroll) < 0.5) currentScroll = targetScroll;
      window.scrollTo({ top: currentScroll, behavior: "instant" });

      if (currentScroll !== targetScroll) {
        animationFrame = window.requestAnimationFrame(animateScroll);
      } else {
        animationFrame = 0;
      }
    };

    const handleWheel = event => {
      const targetElement = event.target instanceof Element ? event.target : null;
      if (
        event.ctrlKey ||
        event.defaultPrevented ||
        event.deltaY === 0 ||
        document.querySelector(".checkout-overlay") ||
        targetElement?.closest("input, textarea, select, [contenteditable='true'], [data-native-scroll]")
      ) return;

      const deltaMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1;

      event.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll + event.deltaY * deltaMultiplier));

      if (!animationFrame) animationFrame = window.requestAnimationFrame(animateScroll);
    };

    const syncScrollPosition = () => {
      if (!animationFrame) {
        currentScroll = window.scrollY;
        targetScroll = currentScroll;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", syncScrollPosition, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncScrollPosition);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main>
      <svg className="image-filters" aria-hidden="true" focusable="false">
        <filter id="dark-background-transparent" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    4 4 4 0 -0.16"
          />
        </filter>
      </svg>
      <header className="nav">
        <div className="brand">SAUVAGE<span>DIOR</span></div>
        <div className="nav-center">EAU DE TOILETTE</div>
        <a className="nav-buy" href="#buy">SHOP <ArrowUpRight size={14} /></a>
      </header>

      <section className="hero">
        <div className="hero-light-sweep" aria-hidden="true" />
        <div className="hero-vignette" />
        <div className="hero-content">
          <p className="kicker">THE NEW FRONTIER OF FRESHNESS</p>
          <h1><span>SAUVAGE</span></h1>
          <p className="hero-sub">A raw, powerful fragrance inspired by wide open spaces.</p>
          <a href="#explore" className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={17} />
          </a>
        </div>
      </section>

      <section ref={experienceRef} id="explore" className="experience">
        <div className="sticky-scene">
          <div className="scene-title">
            <span>THE SCENT, REVEALED</span>
            <div className="scene-line" />
          </div>

          <ProductVisual scrollYProgress={experienceScrollProgress} />

          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />

          <div className="side-note left-note">FORMULATED<br />FOR A LASTING TRAIL</div>
          <div className="side-note right-note">FRESH · AROMATIC · WOODY</div>
        </div>

        <div className="story">
          {info.map((item, index) => (
            <InfoCard item={item} index={index} key={item.id} />
          ))}
        </div>
      </section>

      <EditionSelector
        selectedEdition={selectedEdition}
        onSelect={setSelectedEdition}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <section className="notes">
        <div className="notes-inner">
          <div>
            <p className="kicker">THE COMPOSITION</p>
            <h2>Three dimensions.<br />One unmistakable trail.</h2>
          </div>
          <div className="note-grid">
            <div><b>TOP</b><span>Fresh citrus</span></div>
            <div><b>HEART</b><span>Aromatic spice</span></div>
            <div><b>BASE</b><span>Woody amber</span></div>
          </div>
        </div>
      </section>

      <section id="buy" className="buy-section">
        <div className="buy-glow" />
        <div className="buy-copy">
          <p className="kicker">MAKE IT YOUR SIGNATURE</p>
          <h2>Enter the<br /><i>wild.</i></h2>
          <p>Discover Sauvage Eau de Toilette and experience the full composition on skin.</p>
          <button className="buy-button">BUY SAUVAGE <ArrowUpRight size={17} /></button>
        </div>
        <PurchaseProductVisual />
      </section>

      <footer>
        <span>SAUVAGE — DIOR</span>
        <span>SCROLL EXPERIENCE</span>
      </footer>
      <div className="scroll-progress" role="status" aria-label={`Page ${scrollPercentage}% scrolled`}>
        <div className="scroll-progress-copy">
          <span>PAGE</span>
          <strong>{String(scrollPercentage).padStart(2, "0")}<small>%</small></strong>
        </div>
        <div className="scroll-progress-track" aria-hidden="true">
          <div className="scroll-progress-fill" style={{ transform: `scaleY(${scrollPercentage / 100})` }} />
        </div>
      </div>
      {isCheckoutOpen && (
        <CheckoutDialog edition={selectedEdition} onClose={closeCheckout} />
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
