import { ArrowUpRight, Brain, Check, Copy, Cpu, Database, Mail, Phone, Rocket, Server, Shield, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import { EXPERIENCE, FEATURED, MORE, PROFILE, SKILLS, STATS, type Category, type Project } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Counter, Reveal, SectionTitle, TiltCard } from "./ui";

const base = import.meta.env.BASE_URL;
const img = (p: string) => `${base}${p}`;

/* ---------------------------------- About --------------------------------- */
export function About() {
  return (
    <section id="about" className="section-wrap py-28 sm:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <TiltCard max={8} className="mx-auto w-full max-w-md rounded-[2rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-panel p-3">
              <img src={img("assets/headshot.webp")} alt="Portrait of Hanzala Saqib" className="aspect-square w-full rounded-[1.5rem] object-cover" />
              <div className="glass absolute right-6 bottom-6 left-6 flex items-center justify-between rounded-2xl px-5 py-4 [transform:translateZ(40px)]">
                <div><div className="font-display text-lg font-semibold">{PROFILE.name}</div><div className="text-xs text-mist">{PROFILE.role}</div></div>
                <Sparkles className="h-5 w-5 text-gold" />
              </div>
            </div>
          </TiltCard>
        </Reveal>
        <div>
          <Reveal><p className="eyebrow">01 / About me</p></Reveal>
          <Reveal delay={0.1}><h2 className="heading mt-4">I don't just write code.<br /><span className="text-gradient">I ship what ideas are trying to become.</span></h2></Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-mist">I'm a full stack developer who builds AI into real products: agents that call tools and take actions, retrieval systems that cite their sources, stores that understand plain-language search, and dashboards that watch hardware in real time.</p>
            <p className="mt-4 text-lg leading-relaxed text-mist">I work across the whole lifecycle: shaping the product, designing the data model and APIs, building the interface, then testing, containerising and deploying it. Every project below has tests, CI and a live demo you can open right now.</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i}>
                <div className="glass rounded-2xl p-5">
                  <div className="font-display text-4xl font-semibold text-white"><Counter value={s.value} suffix={s.suffix} /></div>
                  <div className="mt-1 text-xs tracking-wide text-mist">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Marquee -------------------------------- */
export function Marquee() {
  const words = ["AI Agents", "RAG", "React 19", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "Three.js", "MQTT", "ESP32", "Docker", "AWS", "LLM Tool Calling"];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-coal/60 py-6">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-medium text-zinc-500">{w}<span className="text-gold">✦</span></span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Projects -------------------------------- */
const FILTERS: [Category | "all", string][] = [["all", "All work"], ["ai", "AI"], ["commerce", "E-commerce"], ["iot", "IoT"], ["web", "Web"]];

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-2xl shadow-black/60">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </div>
      <img src={img(src)} alt={alt} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

function FeaturedProject({ p, i }: { p: Project; i: number }) {
  const [shot, setShot] = useState(0);
  const flip = i % 2 === 1;
  return (
    <Reveal>
      <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={flip ? "lg:order-2" : ""}>
          <TiltCard className="rounded-2xl">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${p.accent}55, transparent 70%)` }} />
            <AnimatePresence mode="wait">
              <motion.div key={shot} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <BrowserFrame src={(p.gallery ?? [p.image!])[shot]} alt={`${p.title} screenshot`} />
              </motion.div>
            </AnimatePresence>
          </TiltCard>
          {p.gallery && p.gallery.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {p.gallery.map((_, k) => <button key={k} onClick={() => setShot(k)} aria-label={`Show screenshot ${k + 1}`} className={`h-1.5 rounded-full transition-all ${shot === k ? "w-8 bg-gold" : "w-3 bg-white/20 hover:bg-white/40"}`} />)}
            </div>
          )}
        </div>
        <div>
          <p className="font-display text-xs tracking-[0.25em] uppercase" style={{ color: p.accent }}>0{i + 1} · {p.kicker}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">{p.title}</h3>
          <p className="mt-4 leading-relaxed text-mist">{p.summary}</p>
          <ul className="mt-6 space-y-2.5">
            {p.highlights.map((h) => <li key={h} className="flex gap-3 text-sm text-zinc-300"><Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: p.accent }} />{h}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn-gold"><Rocket className="h-4 w-4" /> Live demo</a>}
            {p.code && <a href={p.code} target="_blank" rel="noreferrer" className="btn-ghost"><GithubIcon className="h-4 w-4" /> Source code</a>}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const ART_ICON: Record<Category, typeof Brain> = { ai: Brain, commerce: Sparkles, iot: Cpu, web: Server };

function MiniProject({ p }: { p: Project }) {
  const Icon = ART_ICON[p.category[0]];
  return (
    <TiltCard max={7} className="h-full rounded-3xl">
      <a href={p.code} target="_blank" rel="noreferrer" className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-panel/80 transition hover:border-white/20">
        <div className="relative aspect-[16/10] overflow-hidden">
          {p.image ? (
            <img src={img(p.image)} alt={`${p.title} preview`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <div className="grid h-full w-full place-items-center" style={{ background: `radial-gradient(circle at 30% 20%, ${p.accent}40, transparent 55%), radial-gradient(circle at 80% 90%, ${p.accent}25, transparent 50%), #0e0e13` }}>
              <div className="grid-bg absolute inset-0 opacity-60" />
              <Icon className="relative h-14 w-14 transition duration-500 group-hover:scale-110" style={{ color: p.accent }} strokeWidth={1.2} />
            </div>
          )}
          <span className="glass absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full text-white opacity-0 transition group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase">{p.kicker}</p>
          <h4 className="mt-2 font-display text-xl font-semibold text-white">{p.title}</h4>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{p.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0, 4).map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
      </a>
    </TiltCard>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const match = (p: Project) => filter === "all" || p.category.includes(filter);
  const featured = FEATURED.filter(match), more = MORE.filter(match);
  return (
    <section id="projects" className="section-wrap py-28 sm:py-36">
      <SectionTitle index="02" eyebrow="Featured work" title={<>Real products.<br /><span className="text-gradient">Live demos. Open source.</span></>}>
        Four flagship builds with a working demo you can open in your browser, plus the rest of what I've shipped. Every repository includes tests, CI and setup instructions.
      </SectionTitle>
      <div className="mb-16 flex flex-wrap gap-2">
        {FILTERS.map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} className={`relative rounded-full px-5 py-2 text-sm transition ${filter === k ? "text-ink" : "text-zinc-300 hover:text-white"}`}>
            {filter === k && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-28">{featured.map((p) => <FeaturedProject key={p.slug} p={p} i={FEATURED.indexOf(p)} />)}</div>
      {more.length > 0 && (
        <div className="mt-32">
          <Reveal><h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">More projects</h3></Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full"><MiniProject p={p} /></Reveal>)}
          </div>
        </div>
      )}
      <Reveal className="mt-16 text-center">
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn-ghost"><GithubIcon className="h-4 w-4" /> See everything on GitHub</a>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Skills --------------------------------- */
const SKILL_ICONS = [Brain, Sparkles, Server, Database, Shield, Rocket];

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[400px] max-w-4xl rounded-full bg-violet/10 blur-[140px]" />
      <div className="section-wrap">
        <SectionTitle index="03" eyebrow="Tech stack" title={<>Systems that hold<br /><span className="text-gradient">under pressure.</span></>}>
          Modern tools matter. Knowing when and how to use them matters more. This is the stack behind the projects above.
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g, i) => {
            const Icon = SKILL_ICONS[i];
            return (
              <Reveal key={g.title} delay={(i % 3) * 0.08}>
                <TiltCard max={8} className="h-full rounded-3xl">
                  <div className="glass h-full rounded-3xl p-7">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/25 to-cyan/10 text-gold"><Icon className="h-6 w-6" strokeWidth={1.6} /></div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{g.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">{g.items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Experience ------------------------------- */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  return (
    <section id="experience" className="section-wrap py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle index="04" eyebrow="Experience" title={<>A timeline of<br /><span className="text-gradient">forward motion.</span></>}>
          Every role is a new constraint to understand and a better system to leave behind.
        </SectionTitle>
        <div ref={ref} className="relative pl-10">
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-white/10" />
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-gold to-cyan" />
          <div className="space-y-12">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role + e.company} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute top-1.5 -left-10 h-[15px] w-[15px] rounded-full border-2 border-gold bg-ink shadow-[0_0_20px_rgba(245,196,107,0.6)]" />
                  <p className="font-display text-xs tracking-[0.2em] text-gold uppercase">{e.date}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">{e.role}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{e.company}</p>
                  <p className="mt-3 max-w-xl leading-relaxed text-mist">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Contact -------------------------------- */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ } };
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="section-wrap py-28 sm:py-36">
      <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]" />
        <div className="relative grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">05 / Contact</p>
            <h2 className="heading mt-4">Let's build<br /><span className="text-gradient">what's next.</span></h2>
            <p className="mt-6 max-w-md text-lg text-mist">Have a product, platform or problem worth solving? I'm open to full-time roles and freelance work, remote or international.</p>
            <div className="mt-10 space-y-3">
              <button onClick={copy} className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-gold/50">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold"><Mail className="h-5 w-5" /></span>
                <span className="flex-1"><span className="block text-xs text-zinc-500">Email · click to copy</span><span className="text-white">{PROFILE.email}</span></span>
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-500 group-hover:text-gold" />}
              </button>
              <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold/50">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold"><Phone className="h-5 w-5" /></span>
                <span><span className="block text-xs text-zinc-500">Phone / WhatsApp</span><span className="text-white">{PROFILE.phone}</span></span>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold/50"><LinkedinIcon className="h-5 w-5 text-[#0A66C2]" /><span className="text-sm text-white">LinkedIn</span></a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold/50"><GithubIcon className="h-5 w-5" /><span className="text-sm text-white">GitHub</span></a>
              </div>
            </div>
          </div>
          <form onSubmit={send} className="space-y-4 self-center">
            {[["name", "Your name", "text"], ["email", "you@company.com", "email"]].map(([n, ph, t]) => (
              <label key={n} className="block"><span className="mb-2 block text-xs tracking-wider text-zinc-400 uppercase">{n}</span>
                <input required name={n} type={t} placeholder={ph} className="w-full rounded-2xl border border-white/10 bg-ink/60 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-gold/60" />
              </label>
            ))}
            <label className="block"><span className="mb-2 block text-xs tracking-wider text-zinc-400 uppercase">Message</span>
              <textarea required name="message" rows={5} placeholder="Tell me what you're building..." className="w-full resize-none rounded-2xl border border-white/10 bg-ink/60 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-gold/60" />
            </label>
            <button className="btn-gold w-full justify-center py-4">Send message <ArrowUpRight className="h-4 w-4" /></button>
            <p className="text-center text-xs text-zinc-500">Opens your email app with the message ready to send.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="section-wrap flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-10 text-xs tracking-wider text-zinc-500 sm:flex-row">
      <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gold font-display text-xs font-bold text-ink">HS</span><span className="uppercase">{PROFILE.name}</span></div>
      <span>Designed & built by Hanzala Saqib · © {new Date().getFullYear()}</span>
      <a href="#top" className="uppercase transition hover:text-gold">Back to top ↑</a>
    </footer>
  );
}
