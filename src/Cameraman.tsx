import { useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls, PerspectiveCamera as PCamera } from "@react-three/drei";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import { folder, useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SOFT_LIMITS = {
  minPolar: Math.PI / 4,
  maxPolar: Math.PI / 2.5,
  minAzimuth: Math.PI / 32,
  maxAzimuth: Math.PI / 1.5,
  minDistance: 10,
  maxDistance: 10,
  margin: 1, // elasticity
  rubberBand: 0.12,
};

type Tuple3 = [number, number, number];

interface OrbitCameraLevaOptions {
  cameraRef: React.RefObject<PerspectiveCamera | null>;
  controlsRef: React.RefObject<OrbitControlsType | null>;
  initialPosition?: Tuple3;
  initialRotation?: Tuple3;
  initialFov?: number;
  initialTarget?: Tuple3;
}

export function useOrbitCameraLevaTwoWay({
  cameraRef,
  controlsRef,
  initialPosition = [7.359, 3.958, 6.926],
  initialRotation = [-0.627, 0.71, 0.441],
  initialFov = 30,
  initialTarget = [0, 0, 0],
}: OrbitCameraLevaOptions) {
  const updatingFromControls = useRef(false);
  const updatingFromLeva = useRef(false);

  const [leva, setLeva] = useControls("Camera & Controls", () => ({
    Position: folder({
      posX: { value: initialPosition[0], min: -50, max: 50, step: 0.01 },
      posY: { value: initialPosition[1], min: -50, max: 50, step: 0.01 },
      posZ: { value: initialPosition[2], min: -50, max: 50, step: 0.01 },
    }),
    Rotation: folder({
      rotX: {
        value: initialRotation[0],
        min: -Math.PI,
        max: Math.PI,
        step: 0.01,
      },
      rotY: {
        value: initialRotation[1],
        min: -Math.PI,
        max: Math.PI,
        step: 0.01,
      },
      rotZ: {
        value: initialRotation[2],
        min: -Math.PI,
        max: Math.PI,
        step: 0.01,
      },
    }),
    fov: { value: initialFov, min: 10, max: 120, step: 0.1 },
    Target: folder({
      targetX: { value: initialTarget[0], min: -20, max: 20, step: 0.01 },
      targetY: { value: initialTarget[1], min: -20, max: 20, step: 0.01 },
      targetZ: { value: initialTarget[2], min: -20, max: 20, step: 0.01 },
    }),
    enablePan: { value: true },
    enableZoom: { value: true },
    enableRotate: { value: true },
  }));

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    updatingFromLeva.current = true;

    cameraRef.current.position.set(leva.posX, leva.posY, leva.posZ);
    cameraRef.current.rotation.set(leva.rotX, leva.rotY, leva.rotZ);
    cameraRef.current.fov = leva.fov;
    cameraRef.current.updateProjectionMatrix();

    controlsRef.current.target.set(leva.targetX, leva.targetY, leva.targetZ);
    controlsRef.current.enablePan = leva.enablePan;
    controlsRef.current.enableZoom = leva.enableZoom;
    controlsRef.current.enableRotate = leva.enableRotate;
    controlsRef.current.update();

    updatingFromLeva.current = false;
  }, [
    cameraRef,
    controlsRef,
    leva.posX,
    leva.posY,
    leva.posZ,
    leva.rotX,
    leva.rotY,
    leva.rotZ,
    leva.fov,
    leva.targetX,
    leva.targetY,
    leva.targetZ,
    leva.enablePan,
    leva.enableZoom,
    leva.enableRotate,
  ]);

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    function handleChange() {
      if (updatingFromLeva.current) return;

      updatingFromControls.current = true;

      if (cameraRef.current) {
        setLeva({
          posX: cameraRef.current.position.x,
          posY: cameraRef.current.position.y,
          posZ: cameraRef.current.position.z,
          rotX: cameraRef.current.rotation.x,
          rotY: cameraRef.current.rotation.y,
          rotZ: cameraRef.current.rotation.z,
          fov: cameraRef.current.fov,
        });
      }

      setLeva({
        targetX: controls.target.x,
        targetY: controls.target.y,
        targetZ: controls.target.z,
      });

      updatingFromControls.current = false;
    }

    controls.addEventListener("change", handleChange);

    return () => controls.removeEventListener("change", handleChange);
  }, [controlsRef, cameraRef, setLeva]);
}

export default function CameraMan() {
  const cameraRef = useRef<PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsType | null>(null);
  useOrbitCameraLevaTwoWay({ cameraRef, controlsRef });

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const polar = controls.getPolarAngle();
    const minPolar = SOFT_LIMITS.minPolar;
    const maxPolar = SOFT_LIMITS.maxPolar;
    if (polar < minPolar) {
      controls.setPolarAngle(
        THREE.MathUtils.lerp(polar, minPolar, SOFT_LIMITS.rubberBand)
      );
    } else if (polar > maxPolar) {
      controls.setPolarAngle(
        THREE.MathUtils.lerp(polar, maxPolar, SOFT_LIMITS.rubberBand)
      );
    }

    const azimuth = controls.getAzimuthalAngle();
    const minAzimuth = SOFT_LIMITS.minAzimuth;
    const maxAzimuth = SOFT_LIMITS.maxAzimuth;
    if (azimuth < minAzimuth) {
      controls.setAzimuthalAngle(
        THREE.MathUtils.lerp(azimuth, minAzimuth, SOFT_LIMITS.rubberBand)
      );
    } else if (azimuth > maxAzimuth) {
      controls.setAzimuthalAngle(
        THREE.MathUtils.lerp(azimuth, maxAzimuth, SOFT_LIMITS.rubberBand)
      );
    }

    const distance = controls.object.position.distanceTo(controls.target);
    const minDistance = SOFT_LIMITS.minDistance;
    const maxDistance = SOFT_LIMITS.maxDistance;
    if (distance < minDistance) {
      controls.object.position.lerp(
        controls.target
          .clone()
          .add(
            controls.object.position
              .clone()
              .sub(controls.target)
              .normalize()
              .multiplyScalar(minDistance)
          ),
        SOFT_LIMITS.rubberBand
      );
    } else if (distance > maxDistance) {
      controls.object.position.lerp(
        controls.target
          .clone()
          .add(
            controls.object.position
              .clone()
              .sub(controls.target)
              .normalize()
              .multiplyScalar(maxDistance)
          ),
        SOFT_LIMITS.rubberBand
      );
    }

    controls.update();
  });

  return (
    <>
      <PCamera
        ref={cameraRef}
        makeDefault
        position={[7.359, 3.958, 6.926]}
        rotation={[-0.627, 0.71, 0.441]}
        fov={30}
      />
      <OrbitControls
        ref={controlsRef}
        enableDamping={true}
        dampingFactor={0.05}
        // minPolarAngle={SOFT_LIMITS.minPolar - SOFT_LIMITS.margin}
        // maxPolarAngle={SOFT_LIMITS.maxPolar + SOFT_LIMITS.margin}
        // minAzimuthAngle={SOFT_LIMITS.minAzimuth - SOFT_LIMITS.margin}
        // maxAzimuthAngle={SOFT_LIMITS.maxAzimuth + SOFT_LIMITS.margin}
        // minDistance={SOFT_LIMITS.minDistance}
        // maxDistance={SOFT_LIMITS.maxDistance}
      />
    </>
  );
}
