import { useSphere } from "@react-three/cannon";
import { type ThreeElements, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { forwardRef, memo } from "react";
import { Mesh, Vector3 } from "three";
import { Cannon } from "./Castle/Cannon";

export type CubeProps = {
  position: [number, number, number];
  color: string;
  size?: number;
};

export type ProjectileState = {
  id: string;
  position: [number, number, number];
  velocity: [number, number, number];
  onCollide?: (e: any) => void;
};

const minAngleZ = -Math.PI / 12;
const maxAngleZ = Math.PI / 4;

const Hero = forwardRef<
  Mesh,
  ThreeElements["mesh"] & { aimPoint: Vector3 | null }
>((props, ref) => {
  const { heroPosition } = useControls("hero", {
    heroPosition: { value: [0.5, 1.5, 0.5], step: 0.1 },
    angleX: { value: [minAngleZ, maxAngleZ], step: 0.1 },
    fov: 30,
  });

  useFrame(() => {
    if (ref && "current" in ref && ref.current && props.aimPoint !== null) {
      ref.current.lookAt(props.aimPoint);
    }
  });

  return (
    <>
      <mesh ref={ref} {...props} position={heroPosition} scale={0.3}>
        <Cannon position={[0, -0.5, 0]} />
        {/* <axesHelper args={[10]} /> */}
        <Cross position={new Vector3(0, 0, 5)} />
      </mesh>
    </>
  );
});

export function Cross(props: { position: Vector3 }) {
  const { rotation } = useControls("reticule", {
    rotation: { value: [0.4, 0.9, 0.2], step: 0.1 },
  });

  return (
    <mesh receiveShadow position={props.position} rotation={rotation}>
      <tetrahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial visible={true} color="blue" />
    </mesh>
  );
}

export const Projectile = memo(
  ({ id, position, velocity, onCollide }: ProjectileState) => {
    const [ref] = useSphere(() => ({
      mass: 0.1,
      position,
      velocity,
      args: [0.2],
      onCollide,
      userData: { type: "projectile", id },
    }));

    return (
      <mesh ref={ref}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
);

export default Hero;
