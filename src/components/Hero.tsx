import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { PROFILE } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./icons";

const Scene3D = lazy(() => import("./Scene3D"));
const base = import.meta.env.BASE_URL;

function LahoreTime() {
  const fmt = () => new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" });
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 30_000); return () => clearInterval(id); }, []);
  return <span>{t} PKT</span>;
}

const line = { hidden: { y: "110%" }, show: (i: number) => ({ y: 0, transition: { duration: 1, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const } }) };

export default function Hero() {
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 500], [1, 0]);
  const lift = useTransform(scrollY, [0, 500], [0, -80]);
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { margin: "0px 0px -10% 0px" }); // pause the 3D render loop off-screen

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-cyan/10 blur-[140px]" />

      <div className="absolute inset-0 lg:left-[38%]">
        <Suspense fallback={null}><Scene3D active={visible} /></Suspense>
      </div>

      <motion.div style={{ opacity: fade, y: lift }} className="section-wrap relative z-10 pt-28 pb-20">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-zinc-200">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
          Available for full-time roles & freelance projects
        </motion.p>

        <h1 className="mt-8 font-display text-[13vw] leading-[0.92] font-semibold tracking-tight sm:text-7xl lg:text-[6.5rem]">
          {["I build AI", "products that", "actually ship."].map((t, i) => (
            <span key={t} className="block overflow-hidden pb-1">
              <motion.span custom={i} variants={line} initial="hidden" animate="show" className={`block ${i === 2 ? "text-gradient" : "text-white"}`}>{t}</motion.span>
            </span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
          I'm <strong className="font-semibold text-white">{PROFILE.name}</strong>, a {PROFILE.role} building tool-calling AI agents, RAG systems, AI-powered commerce and real-time IoT dashboards, from the database to the last pixel.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn-gold">Explore my work <ArrowUpRight className="h-4 w-4" /></a>
          <a href={`${base}${PROFILE.cv}`} download className="btn-ghost"><Download className="h-4 w-4" /> Download CV</a>
          <div className="ml-1 flex gap-2">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid h-11 w-11 place-items-center rounded-full text-zinc-300 transition hover:text-gold"><GithubIcon /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid h-11 w-11 place-items-center rounded-full text-zinc-300 transition hover:text-gold"><LinkedinIcon /></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-14 flex flex-wrap gap-x-8 gap-y-2 font-display text-xs tracking-[0.2em] text-zinc-500 uppercase">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{PROFILE.location}</span>
          <LahoreTime />
          <span>React · Node.js · Python · LLMs</span>
        </motion.div>
      </motion.div>

      <a href="#about" className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-zinc-500 uppercase sm:flex">
        Scroll <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ArrowDown className="h-4 w-4" /></motion.span>
      </a>
    </section>
  );
}
