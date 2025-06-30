import { Text } from "@react-three/drei";
import { useControls } from "leva";
import { type ReactNode, type Ref, useImperativeHandle, useRef } from "react";

export function Info({
  friends,
  enemies,
  ...props
}: {
  friends: number;
  enemies: number;
  children: ReactNode;
}) {
  const { position } = useControls("Info", {
    position: { value: [4.2, 0.7, 1.5], step: 0.1 },
  });

  return (
    <>
      <group position={position}>
        <Text color="black" fontSize={0.09} position={[0, 0.1, 0]}>
          {`Friends:${friends}`}
        </Text>
        <Text color="black" fontSize={0.09} anchorX="center" anchorY="middle">
          {`Enemies:${enemies}`}
        </Text>
      </group>
      {props.children}
    </>
  );
}

export type ScoreType = {
  ref: Ref<ScoreRef>;
};

export type ScoreRef = {
  add: (points: number) => void;
};

export function Score({ ref }: ScoreType) {
  const textRef = useRef<any>(null);
  const countRef = useRef<number>(0);

  const { position, rotation } = useControls("Score", {
    position: { value: [4.2, 0.9, 1.5], step: 0.1 },
    rotation: { value: [0, 0, 0], step: 0.1 },
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        add: (point: number) => {
          countRef.current += point;
        },
      };
    },
    []
  );

  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={0.09}
      color={"black"}
      ref={textRef}
    >
      {`Score:${countRef.current}`}
    </Text>
  );
}
