/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ../../../../public/pirate/GLBformat/grass-patch.glb -t -k 
*/

import * as THREE from "three";
import { type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
type GLTFResult = GLTF & {
  nodes: {
    ["grass-patch_1"]: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

export function GrassPlant(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/public/pirate/GLBformat/grass-patch.glb"
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        name="grass-patch_1"
        geometry={nodes["grass-patch_1"].geometry}
        material={materials.colormap}
      />
    </group>
  );
}

useGLTF.preload("/public/pirate/GLBformat/grass-patch.glb");
