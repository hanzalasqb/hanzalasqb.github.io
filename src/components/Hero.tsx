import { ArrowDown, ArrowUpRight, Bot, Download, MapPin, Rocket, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { PROFILE } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./icons";

const Scene3D = lazy(() => import("./Scene3D"));
const base = import.meta.env.BASE_URL;
const ROLES = ["Full Stack AI Developer", "AI Agent & RAG Engineer", "MERN Stack Developer", "IoT & Embedded Builder"];

function LahoreTime() {
  const fmt = () => new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" });
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 30_000); return () => clearInterval(id); }, []);
  return <span>{t} PKT</span>;
}

/** Cycles through roles with a vertical slide. */
function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2600); return () => clearInterval(id); }, []);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={ROLES[i]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="text-gradient whitespace-nowrap">
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function FloatingBadge({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }} transition={{ opacity: { delay, duration: 0.6 }, scale: { delay, duration: 0.6 }, y: { delay, duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
      className={`glass pointer-events-none absolute z-10 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm shadow-2xl shadow-black/40 ${className}`}>
      {children}
    </motion.div>
  );
}

const rise = { hidden: { y: "110%" }, show: (i: number) => ({ y: 0, transition: { duration: 1, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const } }) };

export default function Hero() {
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 520], [1, 0]);
  const lift = useTransform(scrollY, [0, 520], [0, -70]);
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { margin: "0px 0px -10% 0px" }); // pause the 3D render loop off-screen

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-cyan/10 blur-[140px]" />

      <motion.div style={{ opacity: fade, y: lift }} className="section-wrap relative z-10 grid items-center gap-6 pt-28 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        {/* left: name and intro */}
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-zinc-200">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            Available for full-time roles & freelance projects
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 font-display text-lg text-zinc-400">Hi, I'm</motion.p>
          <h1 className="mt-1 font-display text-[16vw] leading-[0.9] font-semibold tracking-tight sm:text-8xl lg:text-[6.8rem]">
            {["Hanzala", "Saqib."].map((t, i) => (
              <span key={t} className="block overflow-hidden pb-2">
                <motion.span custom={i} variants={rise} initial="hidden" animate="show" className={`block ${i === 1 ? "text-gradient" : "text-white"}`}>{t}</motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-5 font-display text-2xl font-medium text-white sm:text-3xl">
            <RotatingRole />
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 1 }} className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            I build AI products that actually ship: tool-calling agents, RAG systems, AI-powered commerce and real-time IoT dashboards, from the database to the last pixel.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-gold">Explore my work <ArrowUpRight className="h-4 w-4" /></a>
            <a href={`${base}${PROFILE.cv}`} download className="btn-ghost"><Download className="h-4 w-4" /> Download resume</a>
            <div className="ml-1 flex gap-2">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid h-11 w-11 place-items-center rounded-full text-zinc-300 transition hover:text-gold"><GithubIcon /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid h-11 w-11 place-items-center rounded-full text-zinc-300 transition hover:text-gold"><LinkedinIcon /></a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-display text-xs tracking-[0.2em] text-zinc-500 uppercase">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{PROFILE.location}</span>
            <LahoreTime />
            <span>React · Node.js · Python · LLMs</span>
          </motion.div>
        </div>

        {/* right: 3D animated portrait */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative order-first h-[380px] sm:h-[480px] lg:order-last lg:h-[640px]">
          <Suspense fallback={<img src={`${base}assets/headshot.webp`} alt="" className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gold/70 object-cover" />}>
            <Scene3D active={visible} />
          </Suspense>
          <span className="sr-only">Animated 3D portrait of {PROFILE.name}</span>
          <FloatingBadge className="top-[12%] left-0 hidden sm:flex" delay={1}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/20 text-gold"><Bot className="h-4 w-4" /></span>
            <span><span className="block font-semibold text-white">AI agents</span><span className="text-xs text-mist">tool calling · RAG</span></span>
          </FloatingBadge>
          <FloatingBadge className="top-[60%] -right-2 hidden sm:flex" delay={1.25}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/15 text-cyan"><Rocket className="h-4 w-4" /></span>
            <span><span className="block font-semibold text-white">4 live demos</span><span className="text-xs text-mist">open in your browser</span></span>
          </FloatingBadge>
          <FloatingBadge className="bottom-[10%] left-[6%] hidden sm:flex" delay={1.5}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet/20 text-violet"><Sparkles className="h-4 w-4" /></span>
            <span><span className="block font-semibold text-white">Full stack</span><span className="text-xs text-mist">React · Node · Python</span></span>
          </FloatingBadge>
        </motion.div>
      </motion.div>

      <a href="#about" className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-zinc-500 uppercase sm:flex">
        Scroll <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ArrowDown className="h-4 w-4" /></motion.span>
      </a>
    </section>
  );
}
