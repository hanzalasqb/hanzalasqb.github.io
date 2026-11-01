import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fades and lifts children into view once. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionTitle({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="eyebrow">{index} / {eyebrow}</p>
      <h2 className="heading mt-4">{title}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-mist">{children}</p>}
    </Reveal>
  );
}

/** Card that tilts in 3D toward the pointer, with a light sheen that follows it. */
export function TiltCard({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5), py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const sheen = useTransform([px, py], ([x, y]) => `radial-gradient(500px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(245,196,107,0.14), transparent 45%)`);
  return (
    <motion.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width); py.set((e.clientY - r.top) / r.height); }}
      onPointerLeave={() => { px.set(0.5); py.set(0.5); }}
    >
      {children}
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: sheen }} />
    </motion.div>
  );
}

/** Number that counts up when it scrolls into view. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}
