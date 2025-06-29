import { usePlane } from "@react-three/cannon";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useControls } from "leva";
import { Color } from "three";

// ShaderMaterial pour fade sur les bords rectangulaires
const RectFadeMaterial = shaderMaterial(
  { uFade: 0.12, uColor: new Color("#e9dbbb") },
  // vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment
  `
    varying vec2 vUv;
    uniform float uFade;
    uniform vec3 uColor;

    void main() {
 
      float fadeX = smoothstep(0.0, uFade, vUv.x);
      fadeX *= 1.0 - smoothstep(1.0 - uFade, 1.0, vUv.x);

      float fadeY = smoothstep(0.0, uFade, vUv.y);
      fadeY *= 1.0 - smoothstep(1.0 - uFade, 1.0, vUv.y);

      float fade = fadeX * fadeY; // combine le fade horizontal & vertical

      gl_FragColor = vec4(uColor, fade);
      if (gl_FragColor.a < 0.01) discard;
    }
  `
);
extend({ RectFadeMaterial });

export default function Plane({ size = 50, ...props }: any) {
  const { onShoot, onPointerMove, ...rest } = props;
  const [ref] = usePlane(() => ({
    position: [0, 0.01, 0],
    rotation: [-Math.PI / 2, 0, 0],
    mass: 0,
    userData: { name: "ground" },
    ...rest,
  }));
  const { uFade, color } = useControls("ground", {
    uFade: {
      value: 0.4,
      min: 0,
      max: 0.4,
      step: 0.01,
      label: "Largeur Fade (bord)",
    },
    color: {
      //value: '#e9dbbb',
      value: "#f0f0f0",
      //value: '#ffd6a8',
      label: "Couleur du sol",
    },
  });

  return (
    <>
      <mesh
        rotation-x={-Math.PI / 2}
        ref={ref}
        receiveShadow
        onClick={onShoot}
        onPointerMove={props.onPointerMove}
      >
        <circleGeometry args={[10, 32]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, 0, 0]} // Léger offset pour éviter le z-fighting
      >
        <planeGeometry args={[size, size, 100, 100]} />
        {/* @ts-ignore */}
        <rectFadeMaterial uFade={uFade} uColor={new Color(color)} transparent />
      </mesh>
    </>
  );
}
