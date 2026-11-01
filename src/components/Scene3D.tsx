import { Float, Sparkles, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const speed = reduced ? 0.15 : 1;
const PHOTO = `${import.meta.env.BASE_URL}assets/headshot.webp`;

/** Soft radial glow drawn on a canvas, used as an additive halo behind the portrait. */
function useGlowTexture(color: string) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, color);
    grd.addColorStop(0.35, color.replace("1)", "0.35)"));
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [color]);
}

/** The profile photo as a gold-rimmed 3D medallion that tilts toward the pointer and sways on its own. */
function Portrait() {
  const group = useRef<THREE.Group>(null);
  const photo = useTexture(PHOTO);
  photo.colorSpace = THREE.SRGBColorSpace;
  photo.anisotropy = 8;
  const glow = useGlowTexture("rgba(245,196,107,1)");
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime * speed;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.45 + Math.sin(t * 0.6) * 0.18, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.3 + Math.cos(t * 0.5) * 0.06, 0.06);
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[6.2, 6.2]} />
        <meshBasicMaterial map={glow} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* coin body gives the portrait real thickness when it tilts */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.16, 96]} />
        <meshStandardMaterial color="#c8912f" metalness={0.9} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, 0.081]}>
        <circleGeometry args={[1.5, 96]} />
        <meshBasicMaterial map={photo} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.085]}>
        <torusGeometry args={[1.55, 0.06, 32, 160]} />
        <meshStandardMaterial color="#f5c46b" metalness={1} roughness={0.2} emissive="#5a3a0c" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0, -0.081]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[1.6, 96]} />
        <meshStandardMaterial color="#1a1206" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Orbit rings and glowing nodes circling the portrait. */
function Orbits() {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const nodes = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const points = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ r: 2.05 + (i % 2) * 0.35, a: (i / 8) * Math.PI * 2, s: 0.045 + (i % 3) * 0.02, c: i % 3 === 0 ? "#22d3ee" : "#f5c46b" })), []);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speed;
    if (ringA.current) { ringA.current.rotation.z += delta * 0.35 * speed; ringA.current.rotation.x = 0.32 + Math.sin(t * 0.5) * 0.12; }
    if (ringB.current) { ringB.current.rotation.z -= delta * 0.22 * speed; ringB.current.rotation.y = -0.3 + Math.cos(t * 0.4) * 0.12; }
    if (nodes.current) nodes.current.rotation.z += delta * 0.3 * speed;
    if (shell.current) { shell.current.rotation.y += delta * 0.08 * speed; shell.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2; }
  });
  return (
    <group>
      <mesh ref={shell} scale={2.3} position={[0, 0, -2.9]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#f5c46b" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh ref={ringA} rotation={[0.32, 0.38, 0]}>
        <torusGeometry args={[2.05, 0.012, 16, 220]} />
        <meshBasicMaterial color="#f5c46b" transparent opacity={0.75} />
      </mesh>
      <mesh ref={ringB} rotation={[-0.42, -0.3, 0.4]}>
        <torusGeometry args={[2.4, 0.008, 16, 220]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>
      <group ref={nodes} rotation={[0.3, 0.3, 0]}>
        {points.map((n, i) => (
          <mesh key={i} position={[Math.cos(n.a) * n.r, Math.sin(n.a) * n.r, Math.sin(n.a * 3) * 0.25]}>
            <sphereGeometry args={[n.s, 16, 16]} />
            <meshBasicMaterial color={n.c} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** A slowly turning field of particles for depth. */
function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 1400, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 4 + Math.random() * 8, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      arr.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p) - 3], i * 3);
    }
    return arr;
  }, []);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.02 * speed; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.025} color="#e9d5a8" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Moves the whole scene up as the hero scrolls away. */
function ScrollRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const s = Math.min(window.scrollY / window.innerHeight, 1.2);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, s * 1.2, 0.1);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -s * 0.15, 0.1);
  });
  return <group ref={ref}>{children}</group>;
}

export default function Scene3D({ active = true }: { active?: boolean }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 6]} intensity={2.6} color="#ffe2a8" />
      <pointLight position={[-4, -2, 3]} intensity={28} color="#22d3ee" />
      <pointLight position={[3, -3, 2]} intensity={22} color="#a78bfa" />
      <ScrollRig>
        <Float speed={1.3 * speed} rotationIntensity={0.15} floatIntensity={0.7}>
          <Suspense fallback={null}><Portrait /></Suspense>
        </Float>
        <Orbits />
      </ScrollRig>
      <Starfield />
      <Sparkles count={50} scale={[8, 7, 4]} size={2.2} speed={0.35 * speed} color="#f5c46b" opacity={0.7} />
    </Canvas>
  );
}
