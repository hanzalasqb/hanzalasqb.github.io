import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { About, Contact, Experience, Footer, Marquee, Projects, Skills } from "./components/Sections";
import { PROFILE } from "./data/content";

const LINKS = ["about", "projects", "skills", "experience", "contact"];

function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      const current = LINKS.filter((id) => { const el = document.getElementById(id); return el && el.getBoundingClientRect().top < window.innerHeight * 0.4; }).pop();
      setActive(current ?? "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl" : ""}`}>
      <nav className="section-wrap flex h-18 items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-deep font-display text-sm font-bold text-ink">HS</span>
          <span className="font-display text-sm font-semibold tracking-[0.25em] text-white uppercase">Hanzala<span className="text-gold">Saqib</span></span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a key={l} href={`#${l}`} className={`relative rounded-full px-4 py-2 text-xs tracking-[0.2em] uppercase transition ${active === l ? "text-white" : "text-zinc-400 hover:text-white"}`}>
              {active === l && <motion.span layoutId="nav" className="absolute inset-0 rounded-full bg-white/[0.07]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="relative">{l}</span>
            </a>
          ))}
        </div>
        <a href={`mailto:${PROFILE.email}`} className="btn-gold hidden !px-5 !py-2.5 md:inline-flex">Hire me</a>
        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden">
            <div className="section-wrap flex flex-col py-4">
              {LINKS.map((l) => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className="py-3 text-sm tracking-[0.2em] text-zinc-300 uppercase">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Soft gold light that follows the cursor on desktop. */
function CursorGlow() {
  const x = useMotionValue(-500), y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20 }), sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX - 250); y.set(e.clientY - 250); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[100px] lg:block" style={{ x: sx, y: sy }} />;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-gold via-gold to-cyan" style={{ scaleX }} />;
}

export default function App() {
  return (
    <div className="noise relative overflow-x-clip">
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
