import { type PublicApi, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import {
  forwardRef,
  type ForwardedRef,
  useEffect,
  useImperativeHandle,
} from "react";

type StoneProps = {
  id: number;
  active: boolean;
  returnToPool: (id: number) => void;
  onCollide: (e: any) => void;
};

export const Stone = forwardRef(
  (
    { id, active, returnToPool, onCollide }: StoneProps,
    ref: ForwardedRef<PublicApi>
  ) => {
    const [meshRef, api] = useSphere(() => ({
      mass: 2,
      position: [0, -10, 0],
      args: [0.05],
      onCollide,
      userData: { type: "stone", id },
      material: {
        restitution: 0.1,
        friction: 0.8,
      },
    }));

    useEffect(() => {
      api.sleep();
    }, [api]);

    useImperativeHandle(ref, () => api);

    useFrame(() => {
      if (active) {
        const currentPosition = meshRef.current.position;
        if (currentPosition.y < -20) {
          returnToPool(id);
        }
      }
    });

    return (
      <mesh ref={meshRef} visible={active} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="grey" />
      </mesh>
    );
  }
);
