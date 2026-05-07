import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function useRubleTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(8, 12, 15, 0.6)";
    ctx.beginPath();
    ctx.arc(256, 256, 190, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#33f5ad";
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.font = "bold 250px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#f6fff9";
    ctx.shadowColor = "#33f5ad";
    ctx.shadowBlur = 30;
    ctx.fillText("₽", 256, 260);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function PyramidModel({ boost, reducedMotion }: { boost: number; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const symbolTexture = useRubleTexture();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
    groupRef.current.rotation.y += reducedMotion ? 0 : delta * (0.36 + boost * 2.2);
    groupRef.current.rotation.x = -0.08 + pulse;
  });

  return (
    <group ref={groupRef} name="pyramid-with-ruble" scale={1.28} position={[0, -0.05, 0]}>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.45, 2.15, 4, 1]} />
        <meshStandardMaterial
          color="#11191d"
          emissive="#042b20"
          emissiveIntensity={0.42}
          metalness={0.35}
          roughness={0.28}
          transparent
          opacity={0.62}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.47, 2.17, 4, 1]} />
        <meshBasicMaterial color="#ff375f" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh position={[0, -1.09, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <ringGeometry args={[0.94, 1.52, 4]} />
        <meshBasicMaterial color="#33f5ad" transparent opacity={0.52} side={THREE.DoubleSide} />
      </mesh>
      <sprite name="ruble-inside-pyramid" position={[0, 0, 0]} scale={[0.64, 0.64, 1]} renderOrder={3}>
        <spriteMaterial map={symbolTexture} transparent depthTest={false} />
      </sprite>
      <pointLight color="#33f5ad" intensity={16} position={[2.6, 2.2, 2.4]} distance={6} />
      <pointLight color="#ff375f" intensity={9} position={[-2.3, -0.7, 1.6]} distance={5} />
    </group>
  );
}

function PyramidStage({ scrollBoost }: { scrollBoost: number }) {
  const isMobile = useMediaQuery("(max-width: 720px)");
  const reducedMotion = useReducedMotion();

  return (
    <div className="pyramid-stage" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.3, 5], fov: isMobile ? 48 : 42 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.7]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.55 }}
      >
        <color attach="background" args={["#06090b"]} />
        <fog attach="fog" args={["#06090b", 4.8, 8.5]} />
        <ambientLight intensity={1.25} />
        <Suspense fallback={null}>
          <PyramidModel boost={scrollBoost} reducedMotion={Boolean(reducedMotion)} />
        </Suspense>
      </Canvas>
      <div className="scanline" />
    </div>
  );
}

export default PyramidStage;
