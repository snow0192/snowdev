"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Points,
  TetrahedronGeometry,
  WireframeGeometry,
} from "three";

import { useIsMobile } from "@/lib/use-is-mobile";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPointField(count: number) {
  const rand = mulberry32(42);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 20;
    positions[i * 3 + 1] = (rand() - 0.5) * 12;
    positions[i * 3 + 2] = (rand() - 0.5) * 8 - 1;
  }

  const lineCount = Math.floor(count / 9);
  const linePositions = new Float32Array(lineCount * 6);
  for (let i = 0; i < lineCount; i++) {
    const a = Math.floor(rand() * count);
    let b = Math.floor(rand() * count);
    if (b === a) b = (b + 1) % count;
    for (let axis = 0; axis < 3; axis++) {
      linePositions[i * 6 + axis] = positions[a * 3 + axis];
      linePositions[i * 6 + 3 + axis] = positions[b * 3 + axis];
    }
  }

  const pointsGeometry = new BufferGeometry();
  pointsGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(positions, 3),
  );

  const linesGeometry = new BufferGeometry();
  linesGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(linePositions, 3),
  );

  return { pointsGeometry, linesGeometry };
}

function SceneContent({ reduced }: { reduced: boolean }) {
  const worldRef = useRef<Group>(null);
  const pointsRef = useRef<Points>(null);
  const icoRef = useRef<Group>(null);
  const tetraRef = useRef<Group>(null);
  const isMobile = useIsMobile();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const { pointsGeometry, linesGeometry } = useMemo(
    () => buildPointField(isMobile ? 220 : 650),
    [isMobile],
  );

  const icoWire = useMemo(
    () => new WireframeGeometry(new IcosahedronGeometry(1.35, 0)),
    [],
  );
  const tetraWire = useMemo(
    () => new WireframeGeometry(new TetrahedronGeometry(0.85, 0)),
    [],
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.016;
      pointsRef.current.position.y = Math.sin(time * 0.18) * 0.25;
    }
    if (icoRef.current) {
      icoRef.current.rotation.y += delta * 0.05;
      icoRef.current.rotation.x = Math.sin(time * 0.12) * 0.2;
    }
    if (tetraRef.current) {
      tetraRef.current.rotation.y -= delta * 0.07;
      tetraRef.current.rotation.z = Math.sin(time * 0.1) * 0.15;
    }

    if (worldRef.current && !reduced) {
      const targetX = pointer.current.x * 0.12;
      const targetY = pointer.current.y * 0.08;
      worldRef.current.rotation.y +=
        (targetX - worldRef.current.rotation.y) * 0.03;
      worldRef.current.rotation.x +=
        (targetY - worldRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={worldRef}>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.38}
          depthWrite={false}
        />
      </points>

      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.09}
          depthWrite={false}
        />
      </lineSegments>

      <group ref={icoRef} position={[3.4, 0.6, -1.5]}>
        <lineSegments geometry={icoWire}>
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <group ref={tetraRef} position={[-4.2, -1.4, -0.5]}>
        <lineSegments geometry={tetraWire}>
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.14}
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </group>
  );
}

export default function NetworkScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      className="!absolute !inset-0"
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 9], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <SceneContent reduced={reduced} />
    </Canvas>
  );
}