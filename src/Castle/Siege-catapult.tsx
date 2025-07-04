/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ../../../../public/castle/GLB_format/siege-catapult.glb -t -k 
*/

import * as THREE from "three";
import { type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    ["siege-catapult_1"]: THREE.Mesh;
    catapult: THREE.Mesh;
    wheel: THREE.Mesh;
    wheel_1: THREE.Mesh;
    wheel_2: THREE.Mesh;
    wheel_3: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

export function SiegeCatapult(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/public/castle/GLB_format/siege-catapult.glb"
  ) as unknown as GLTFResult;

  const { rotation, position } = useControls("catapult", {
    rotation: { value: [0, -1.5, 5], step: 0.1 },
    position: { value: [0.419, 0.177, 0], step: 0.1 },
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        name="catapult"
        geometry={nodes.catapult.geometry}
        material={materials.colormap}
        position={position}
        rotation={rotation}
      />
      {/* <mesh
        name="siege-catapult_1"
        geometry={nodes['siege-catapult_1'].geometry}
        material={materials.colormap}
      >
        <mesh
          name="catapult"
          geometry={nodes.catapult.geometry}
          material={materials.colormap}
          position={[0.419, 0.177, 0]}
        />
        <mesh
          name="wheel"
          geometry={nodes.wheel.geometry}
          material={materials.colormap}
          position={[-0.367, 0.052, -0.538]}
        />
        <mesh
          name="wheel_1"
          geometry={nodes.wheel_1.geometry}
          material={materials.colormap}
          position={[0.472, 0.052, -0.538]}
        />
        <mesh
          name="wheel_2"
          geometry={nodes.wheel_2.geometry}
          material={materials.colormap}
          position={[-0.367, 0.052, 0.538]}
        />
        <mesh
          name="wheel_3"
          geometry={nodes.wheel_3.geometry}
          material={materials.colormap}
          position={[0.472, 0.052, 0.538]}
        />
      </mesh> */}
    </group>
  );
}

useGLTF.preload("/public/castle/GLB_format/siege-catapult.glb");
