import { useRef, useEffect, useMemo, type JSX } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Group, Vector3, PerspectiveCamera } from "three";

type ConfettiProps = {
  count?: number;
  colors?: string[];
  duration?: number;
  onComplete?: () => void;
  distanceFromCamera?: number;
} & JSX.IntrinsicElements["group"];

type ConfettiData = {
  x: number;
  y: number;
  z: number;
  rx: number;
  color: string;
  rot: [number, number, number];
  velY: number;
  rotSpeed: [number, number, number];
};

export function Confetti({
  count = 60,
  colors = ["#FF6F61", "#FFB400", "#44CFCB", "#6B47DC", "#F652A0"],
  duration = 2,
  onComplete,
  distanceFromCamera = 5,
  ...props
}: ConfettiProps) {
  const group = useRef<Group>(null);
  const { camera, size } = useThree();
  const perspCam = camera as PerspectiveCamera;

  const spawnPlane = useMemo(() => {
    const camDir = new Vector3();
    perspCam.getWorldDirection(camDir);
    const spawnCenter = perspCam.position
      .clone()
      .add(camDir.clone().multiplyScalar(distanceFromCamera));

    const vFov = (perspCam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * distanceFromCamera;
    const aspect = size.width / size.height;
    const width = height * aspect;

    const up = perspCam.up.clone().normalize();
    const right = new Vector3().crossVectors(camDir, up).normalize();

    return { spawnCenter, width, height, right, up };
    // eslint-disable-next-line
  }, [
    perspCam.position.x,
    perspCam.position.y,
    perspCam.position.z,
    perspCam.quaternion.x,
    perspCam.quaternion.y,
    perspCam.quaternion.z,
    perspCam.quaternion.w,
    perspCam.fov,
    size.width,
    size.height,
    distanceFromCamera,
  ]);

  const confettiMap = useRef<ConfettiData[]>(
    Array.from({ length: count }).map(() => {
      const rx = (Math.random() - 0.5) * spawnPlane.width;
      const ry = Math.random() * 2 + spawnPlane.height / 2;
      const pos = spawnPlane.spawnCenter
        .clone()
        .add(spawnPlane.right.clone().multiplyScalar(rx))
        .add(spawnPlane.up.clone().multiplyScalar(ry));

      return {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        rx,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        velY: -Math.random() * 1.5 - 0.5,
        rotSpeed: [
          Math.random() * 0.05,
          Math.random() * 0.05,
          Math.random() * 0.05,
        ] as [number, number, number],
      };
    })
  );

  useEffect(() => {
    let timer = setTimeout(() => onComplete?.(), duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  useFrame((_, delta) => {
    confettiMap.current.forEach((c, i) => {
      c.y += c.velY * delta;
      c.velY -= 0.5 * delta;
      c.rot[0] += c.rotSpeed[0];
      c.rot[1] += c.rotSpeed[1];
      c.rot[2] += c.rotSpeed[2];

      if (c.y < spawnPlane.spawnCenter.y - spawnPlane.height / 2 - 1) {
        const ry = spawnPlane.height / 2 + Math.random() * 2;
        const pos = spawnPlane.spawnCenter
          .clone()
          .add(spawnPlane.right.clone().multiplyScalar(c.rx))
          .add(spawnPlane.up.clone().multiplyScalar(ry));
        c.x = pos.x;
        c.y = pos.y;
        c.z = pos.z;
        c.velY = -Math.random() * 1.5 - 0.5;
      } else {
        const pos = spawnPlane.spawnCenter
          .clone()
          .add(spawnPlane.right.clone().multiplyScalar(c.rx))
          .add(
            spawnPlane.up.clone().multiplyScalar(c.y - spawnPlane.spawnCenter.y)
          );
        c.x = pos.x;
        c.z = pos.z;
      }

      const mesh = group.current?.children[i] as Mesh;
      if (mesh) {
        mesh.position.set(c.x, c.y, c.z);
        mesh.rotation.set(c.rot[0], c.rot[1], c.rot[2]);
      }
    });
  });

  return (
    <group ref={group} {...props}>
      {confettiMap.current.map((c, i) => (
        <mesh key={i}>
          <planeGeometry args={[0.1, 0.2]} />
          <meshStandardMaterial color={c.color} />
        </mesh>
      ))}
      {props.children}
    </group>
  );
}
