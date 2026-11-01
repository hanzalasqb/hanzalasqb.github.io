import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const speed = reduced ? 0.15 : 1;

/** Glossy liquid-metal core, wireframe shell and orbit rings that follow the pointer and the scroll. */
function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.5 + scroll * 1.2, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.35, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, scroll * 1.4, 0.08);
    // keep the object clear of the headline on wide screens
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.size.width > 700 ? 0.7 : 0, 0.08);
    if (shell.current) { shell.current.rotation.y += delta * 0.12 * speed; shell.current.rotation.z += delta * 0.05 * speed; }
    if (ringA.current) ringA.current.rotation.z += delta * 0.35 * speed;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.22 * speed;
  });
  return (
    <group ref={group} scale={0.88}>
      <Float speed={1.4 * speed} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.25, 32]} />
          <MeshDistortMaterial color="#d4a24c" emissive="#3a2304" emissiveIntensity={0.5} metalness={0.55} roughness={0.22} clearcoat={1} clearcoatRoughness={0.15} distort={0.38} speed={1.8 * speed} />
        </mesh>
        <mesh ref={shell} scale={1.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#f5c46b" wireframe transparent opacity={0.16} />
        </mesh>
      </Float>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.012, 16, 200]} />
        <meshBasicMaterial color="#f5c46b" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.5, 0.4]}>
        <torusGeometry args={[2.75, 0.008, 16, 200]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.45} />
      </mesh>
      <Satellites />
    </group>
  );
}

/** Small glowing nodes orbiting the core, like data moving through a network. */
function Satellites() {
  const ref = useRef<THREE.Group>(null);
  const nodes = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ r: 2.35 + (i % 2) * 0.4, a: (i / 7) * Math.PI * 2, s: 0.05 + (i % 3) * 0.02, c: i % 3 === 0 ? "#22d3ee" : "#f5c46b" })), []);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.25 * speed; });
  return (
    <group ref={ref} rotation={[0.35, 0, 0.15]}>
      {nodes.map((n, i) => (
        <mesh key={i} position={[Math.cos(n.a) * n.r, Math.sin(n.a * 2) * 0.35, Math.sin(n.a) * n.r]}>
          <sphereGeometry args={[n.s, 16, 16]} />
          <meshBasicMaterial color={n.c} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** A slowly turning field of particles for depth. */
function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 1800, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 4 + Math.random() * 9, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      arr.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3);
    }
    return arr;
  }, []);
  useFrame((_, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.02 * speed; ref.current.rotation.x += delta * 0.008 * speed; } });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.025} color="#e9d5a8" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function Scene3D({ active = true }: { active?: boolean }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 7.2], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={2.4} color="#ffe2a8" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#22d3ee" />
      <pointLight position={[3, -3, -2]} intensity={25} color="#a78bfa" />
      <spotLight position={[0, 6, 4]} angle={0.5} penumbra={1} intensity={40} color="#f5c46b" />
      <Core />
      <Starfield />
      <Sparkles count={60} scale={[9, 6, 4]} size={2.2} speed={0.35 * speed} color="#f5c46b" opacity={0.7} />
    </Canvas>
  );
}
