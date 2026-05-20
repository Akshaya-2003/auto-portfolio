"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Mail,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

type Work = {
  id: number;
  title: string;
  category: string;
  subCategory: string | null;
  img: string;
};

import { getPortfolioImages } from "./actions";

const MANAGED_ACCOUNTS = [
  { id: 1, name: "Kuber P Gowda", handle: "@kuber_p_gowda", role: "Content Shoots", link: "https://www.instagram.com/kuberpgowda?igsh=MWN6djZwYXJob3NmZg==" },
  { id: 2, name: "Kuber Creatives", handle: "@kuber_creatives", role: "In-House Production", link: "https://www.instagram.com/kubercreatives?igsh=MTlkczczcXR2OHpwdg==" },
  { id: 3, name: "MGBW Garage", handle: "@mgbw_garage", role: "Former Content Partners", link: "https://www.instagram.com/mgbwgarage.official?igsh=dmRndnhvbmFvZ2g3==" },
];



export default function Home() {
  const [filter, setFilter] = useState("Kuber Creatives");
  const [subFilter, setSubFilter] = useState("Lamborghini Huracan");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [works, setWorks] = useState<Work[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const filteredWorks = works.filter((w) => {
    if (w.category !== filter) return false;
    if (filter === "Kuber Creatives" && subFilter !== "All" && w.subCategory !== subFilter) return false;
    return true;
  });

  useEffect(() => {
    getPortfolioImages().then(setWorks);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter, subFilter]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);


  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black relative">
      <div className="fixed inset-0 z-[-1] bg-noise" />

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-transparent ${scrolled ? "py-4" : "py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="w-[100px] lg:w-[160px] hidden md:block" /> {/* Spacer to keep navigation centered */}

          <nav className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            {["hero", "gallery", "studio", "roster", "pricing", "contact"].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-white transition-colors relative group">
                {item === "hero" ? "Home" : item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center gap-8 px-6 pt-20 pb-10"
          >
            <nav className="flex flex-col items-center gap-8 text-2xl font-black uppercase tracking-tighter italic">
              {["hero", "gallery", "studio", "roster", "pricing", "contact"].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:text-neutral-400 transition-colors"
                >
                  {item === "hero" ? "Home" : item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[100svh] flex flex-col justify-end px-6 pb-6 md:px-12 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent z-10" />
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/assets/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-75 origin-bottom"
          />
        </div>

        <div className="relative z-20 max-w-[1400px] w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >

            <h1 className="!text-5xl sm:!text-6xl md:!text-7xl uppercase tracking-tight leading-[1.05] text-glow">
  WE SHAPE <br />
  AUTOMOTIVE <br />
  ART.
</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-16 pt-8 border-t border-white/10 text-sm text-neutral-400"
          >
            <div className="space-y-4 text-justify text-xs max-w-2xl">
              <p className="leading-relaxed">Your machine deserves more than just pictures — it deserves a proper rollout. From ignition to final frame, we treat every shoot like a precision build. We scout the perfect roads, tune the lighting like horsepower, and capture every curve, contour, and reflection with showroom accuracy.</p>
              <p className="leading-relaxed">We don’t just click cars. We engineer visuals that shift your automobile into the fast lane of attention.</p>
            </div>
            
            <div className="flex flex-col md:text-right space-y-1 text-[10px] md:text-xs uppercase tracking-widest mt-4 md:mt-0 pt-6 md:pt-0 border-t border-white/10 md:border-none shrink-0">
              <span className="text-[9px] text-neutral-600 font-bold mb-2 tracking-[0.3em]">A Portfolio Of</span>
              <p className="text-neutral-300 font-bold">Akshaya Krishna P</p>
              <p className="text-neutral-300 font-bold">Nidhish S Kumar</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO GALLERY SECTION */}
      <section id="gallery" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-600"></span>
              Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">The Gallery Vault</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {["Kuber Creatives", "MGBW Garage", "Other Cars"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setSubFilter(cat === "Kuber Creatives" ? "Lamborghini Huracan" : "All"); }}
                  className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 ${filter === cat
                    ? "bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-white/5"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {filter === "Kuber Creatives" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 lg:justify-end">
                {["Lamborghini Huracan", "M340i", "SLK"].map((subCat) => (
                  <button
                    key={subCat}
                    onClick={() => setSubFilter(subCat)}
                    className={`px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 ${subFilter === subCat
                      ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                      }`}
                  >
                    {subCat}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Dynamic Slideshow */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-900/50 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {filteredWorks.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredWorks[currentIndex].id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full group"
                >
                  <Image
                    src={filteredWorks[currentIndex].img}
                    alt={filteredWorks[currentIndex].title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="z-10 object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              {filteredWorks.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev === 0 ? filteredWorks.length - 1 : prev - 1))}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 bg-black/50 hover:bg-white hover:text-black text-white backdrop-blur-md rounded-full border border-white/10 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev === filteredWorks.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 bg-black/50 hover:bg-white hover:text-black text-white backdrop-blur-md rounded-full border border-white/10 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-40 flex items-center gap-3 bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-xs font-bold tracking-widest text-neutral-300">
                    <span>{currentIndex + 1}</span>
                    <span className="w-4 h-[1px] bg-white/20"></span>
                    <span>{filteredWorks.length}</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600 p-6 text-center z-0">
              <Camera className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-[10px] uppercase tracking-widest">No images found</p>
            </div>
          )}
        </div>
      </section>

      {/* STUDIO SECTION */}
      <section id="studio" className="py-32 bg-neutral-950 border-y border-white/5 px-6 md:px-12 relative overflow-hidden">
        {/* Abstract Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-600"></span>
              The Kuber Creatives Core
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-2 mb-8 text-glow">
              Photography & Production.
            </h2>
            <p className="text-neutral-400 leading-relaxed text-lg mb-12 max-w-3xl">
              As the core Photography and Production team at Kuber Creatives, we don't just click pictures; we engineer complete visual workflows. We architect short-form reels and aesthetic narrative styles optimized explicitly for luxury car enthusiasts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
              {/* Profile 1: Akshaya */}
              <div className="flex flex-col gap-2 p-6 glass-panel rounded-3xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm md:text-lg uppercase tracking-wider leading-tight truncate">Akshaya Krishna P</h4>
                    <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1.5 font-bold truncate">Head of Photography</p>
                  </div>
                  <a 
                    href="https://www.instagram.com/_.lost_in_lens._?igsh=YjgwODYzd2R6ejkx" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-neutral-400 hover:text-white transition-colors flex items-center justify-center p-3 rounded-full hover:bg-white/10 shrink-0"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Profile 2: Nidhish */}
              <div className="flex flex-col gap-2 p-6 glass-panel rounded-3xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm md:text-lg uppercase tracking-wider leading-tight truncate">Nidhish S Kumar</h4>
                    <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1.5 font-bold truncate">Head of Production</p>
                  </div>
                  <a 
                    href="https://www.instagram.com/nid.vfx?igsh=MW1zNHZyMTB6bGZneA==" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-neutral-400 hover:text-white transition-colors flex items-center justify-center p-3 rounded-full hover:bg-white/10 shrink-0"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL ROSTER / FLEET SECTION */}
      <section id="roster" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[80vh] flex flex-col justify-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter mt-4 text-glow">The Fleet</h2>
          <p className="text-neutral-400 text-sm md:text-base mt-6 max-w-2xl mx-auto">
            The machines we document and the accounts we accelerate. A curated roster of our regular clientele and automotive partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MANAGED_ACCOUNTS.map((account, idx) => (
            <motion.a
              key={account.id}
              href={account.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group flex flex-col justify-between p-8 min-h-[280px] h-full glass-panel rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              {/* Automotive Speed Line / Reflection Accent */}
              <div className="absolute top-0 right-10 w-[150%] h-32 bg-gradient-to-r from-transparent via-white/5 to-white/10 -skew-x-[30deg] origin-right group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <Instagram className="w-8 h-8 text-neutral-500 mb-6 group-hover:text-white transition-colors duration-500" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-tight">{account.name}</h3>
                <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mt-2">{account.handle}</p>
              </div>

              <div className="relative z-10 flex items-end justify-between mt-12 border-t border-white/10 pt-6">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500 group-hover:text-neutral-300 transition-colors">{account.role}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative py-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh] flex flex-col justify-center border-t border-white/5 overflow-hidden">
        {/* Automotive Grid / Watermark Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[20rem] font-black italic text-white/[0.02] select-none tracking-tighter whitespace-nowrap">
            RATES //
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]"></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <span className="text-[10px] font-bold text-neutral-500 tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-neutral-600"></span> Service Manifest <span className="w-8 h-[1px] bg-neutral-600"></span>
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mt-4 text-glow">Pricing</h2>
            <p className="text-neutral-400 text-sm md:text-base mt-6 max-w-2xl mx-auto mb-10">
              Transparent pricing for our photography and production services. Review our packages and service terms.
            </p>
            <a
              href="/assets/Shoot & Editing – Terms and Conditions.pdf"
              target="_blank"
              rel="noreferrer"
              className="relative group inline-flex items-center justify-center gap-3 text-sm uppercase tracking-widest font-bold bg-neutral-900 text-white border border-white/20 px-10 py-5 rounded-full overflow-hidden transition-all duration-300 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                View Pricing Guide <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative py-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[80vh] flex flex-col justify-center border-t border-white/5 overflow-hidden">
        {/* Background Image for cinematic mood */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <Image src="/assets/hero-bg.jpg" alt="Contact Background" fill className="object-cover grayscale blur-md" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]"></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-3 bg-neutral-900/80 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-neutral-300">
                Comms Link Open
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-glow">Initialize Project</h2>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full max-w-xl text-sm text-neutral-400 glass-panel p-6 md:p-10 rounded-3xl relative overflow-hidden group border-l-4 border-l-white shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Light sweep effect on hover */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[45deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase italic text-white mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                  Direct Line
                  <span className="text-[10px] tracking-widest text-neutral-500 font-normal normal-case">// 01</span>
                </h3>
                <div className="space-y-4">
                  <a href="mailto:akshayakrishna.p03@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors group/link bg-black/40 border border-white/5 rounded-2xl p-2 pr-6 hover:border-white/20">
                    <div className="p-4 bg-neutral-900 rounded-xl group-hover/link:bg-white group-hover/link:text-black transition-colors flex items-center justify-center shrink-0"><Mail className="w-4 h-4" /></div>
                    <span className="font-medium tracking-wide break-all text-xs md:text-sm">akshayakrishna.p03@gmail.com</span>
                  </a>
                  <a href="mailto:nidhvfx@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors group/link bg-black/40 border border-white/5 rounded-2xl p-2 pr-6 hover:border-white/20">
                    <div className="p-4 bg-neutral-900 rounded-xl group-hover/link:bg-white group-hover/link:text-black transition-colors flex items-center justify-center shrink-0"><Mail className="w-4 h-4" /></div>
                    <span className="font-medium tracking-wide break-all text-xs md:text-sm">nidhvfx@gmail.com</span>
                  </a>
                  <a href="https://wa.me/917892691366" target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-white transition-colors group/link bg-black/40 border border-white/5 rounded-2xl p-2 pr-6 hover:border-white/20">
                    <div className="p-4 bg-neutral-900 rounded-xl group-hover/link:bg-white group-hover/link:text-black transition-colors flex items-center justify-center shrink-0"><img src="https://img.icons8.com/ios-glyphs/480/whatsapp.png" alt="whatsapp" className="w-4 h-4 invert group-hover/link:invert-0 transition-all" /></div>
                    <span className="font-medium tracking-wide text-xs md:text-sm">+91 78926 91366</span>
                  </a>
                  <a href="https://wa.me/918073713190" target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-white transition-colors group/link bg-black/40 border border-white/5 rounded-2xl p-2 pr-6 hover:border-white/20">
                    <div className="p-4 bg-neutral-900 rounded-xl group-hover/link:bg-white group-hover/link:text-black transition-colors flex items-center justify-center shrink-0"><img src="https://img.icons8.com/ios-glyphs/480/whatsapp.png" alt="whatsapp" className="w-4 h-4 invert group-hover/link:invert-0 transition-all" /></div>
                    <span className="font-medium tracking-wide text-xs md:text-sm">+91 8073 713 190</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
