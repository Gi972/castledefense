import { Grid } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo } from "react";
import { DoubleSide, Euler, Shape, ShapeGeometry, Vector3 } from "three";

export default function GridHelper() {
  const { gridSize, ...gridConfig } = useControls(
    "GridHelper",
    {
      gridSize: [10.5, 10.5],
      cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
      cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
      cellColor: "#6f6f6f",
      sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
      sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
      sectionColor: "#9d4b4b",
      fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
      fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
      followCamera: false,
      infiniteGrid: true,
    },
    { collapsed: true }
  );

  return <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />;
}

type DebugAreaProps = {
  radius: number;
  arcAngle: number;
  startAngle: number;
  color?: string;
  position?: Vector3 | [number, number, number];
  rotation?: Euler | [number, number, number];
};

export const DebugArea = ({
  color = "red",
  arcAngle: arcAngleProp,
  radius: radiusProp,
  startAngle: startAngleProp,
  position = [0, 0, 0],
  rotation: rotationProp = [0, 0, 0],
}: DebugAreaProps) => {
  const { radius, arcAngle, startAngle } = useControls("DebugArc", {
    radius: { value: radiusProp, step: 0.1 },
    arcAngle: { value: arcAngleProp, step: 0.1 },
    startAngle: { value: startAngleProp, step: 0.1 },
  });

  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.arc(0, 0, radius, startAngle, startAngle + arcAngle, false);
    shape.closePath();
    return new ShapeGeometry(shape);
  }, [radius, arcAngle, startAngle]);

  const finalRotation = useMemo(() => {
    const euler =
      rotationProp instanceof Euler
        ? rotationProp.clone()
        : new Euler(...rotationProp);
    euler.x = Math.PI / 2;
    return euler;
  }, [rotationProp]);

  return (
    <mesh geometry={geometry} position={position} rotation={finalRotation}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        side={DoubleSide}
      />
    </mesh>
  );
};
