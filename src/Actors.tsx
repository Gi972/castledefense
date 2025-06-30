import { useBox } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, type Object3D } from "three";
import { memo, type ReactNode, useEffect, useMemo, useRef } from "react";

export type TargetState = {
  id: string;
  position: [number, number, number];
  color: string;
  life: number;
  delayRange?: [number, number];
  saved: boolean;
  gameplay?: (id: any) => void;
};

export const Enemy = memo(
  ({
    id,
    position,
    color,
    life,
    delayRange = [0, 20],
    gameplay,
  }: TargetState) => {
    const elapsedRef = useRef(0);
    const refText = useRef<any>(null);
    const pos = useRef<{ fire: boolean; pos: Vector3 }>({
      fire: false,
      pos: new Vector3(),
    });

    const initiallife = useRef(life);

    const [ref, api] = useBox(() => ({
      mass: 1,
      position: position,
      args: [0.2, 0.2, 0.2],
      angularFactor: [0, 0, 0],
      userData: { type: "enemy", id },
    }));

    const startDelay = useMemo(
      () => Math.random() * (delayRange[1] - delayRange[0]) + delayRange[0],
      []
    );

    const stepInterval = 3.0;

    useFrame((_, delta) => {
      elapsedRef.current += delta;

      if (elapsedRef.current >= startDelay) {
        if (elapsedRef.current >= stepInterval) {
          if (pos.current.pos.x <= 3) {
            api.velocity.set(2, 0, 0);
          }
          elapsedRef.current -= stepInterval;
        }
      }
    });

    useEffect(() => {
      const unsubscribe = api.position.subscribe((value) => {
        pos.current.pos.fromArray(value);

        if (refText.current) {
          refText.current.text = `${value[0].toFixed()}`;
        }

        if (pos.current.fire === false && value[0] >= 3) {
          gameplay?.(id);
          pos.current.fire = true;
        }
      });
      return unsubscribe;
    }, []);

    return (
      <mesh ref={ref} castShadow>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color={color} />
        <Annotation>{`${life}/${initiallife.current}`}</Annotation>
        {/* <Text ref={refText} color="black" fontSize={3} position={[0.2, 1, 0]}>
          {null}
        </Text> */}
      </mesh>
    );
  }
);

export const Friend = memo(
  ({
    id,
    position,
    color,
    life,
    delayRange = [0, 10],
    gameplay,
  }: TargetState) => {
    const elapsedRef = useRef(0);
    const initiallife = useRef(life);

    const [ref, api] = useBox(() => ({
      mass: 1,
      position: position,
      args: [0.1, 0.1, 0.1],
      angularFactor: [0, 0, 0],
      userData: { type: "friend", id },
    }));
    const refText = useRef<any>(null);
    const pos = useRef<{ fire: boolean; pos: Vector3 }>({
      fire: false,
      pos: new Vector3(),
    });

    const startDelay = useMemo(
      () => Math.random() * (delayRange[1] - delayRange[0]) + delayRange[0],
      []
    );

    const stepInterval = 3.0;
    useFrame((_, delta) => {
      elapsedRef.current += delta;

      if (elapsedRef.current >= startDelay) {
        if (elapsedRef.current >= stepInterval) {
          if (pos.current.pos.x <= 4) {
            api.velocity.set(2, 0, 0);
          }
          elapsedRef.current -= stepInterval;
        }
      }
    });

    useEffect(() => {
      const unsubscribe = api.position.subscribe((value) => {
        if (refText.current) {
          refText.current.text = `${value[0].toFixed(1)}/ ${value[1].toFixed(
            1
          )}/ ${value[2].toFixed(1)}`;
        }

        pos.current.pos.fromArray(value);

        if (pos.current.fire === false && value[0] >= 4) {
          gameplay?.(id);
          pos.current.fire = true;
        }
      });
      return unsubscribe;
    }, []);

    return (
      <mesh ref={ref} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshStandardMaterial color={color} />
        <Annotation>{`${life}/${initiallife.current}`}</Annotation>
        {/* <Text ref={refText} color="black" fontSize={0.05} position={[0.2, 0.3, 0]}>
          {null}
        </Text> */}
      </mesh>
    );
  }
);

const Annotation = ({ children, ...props }: { children: ReactNode }) => {
  const ref = useRef<Object3D>(null);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  return (
    <>
      <Text
        ref={ref}
        color="black"
        fontSize={0.1}
        position={[0.2, 0.2, 0]}
        {...props}
      >
        {children}
      </Text>
    </>
  );
};
