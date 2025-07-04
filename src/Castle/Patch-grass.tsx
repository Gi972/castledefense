/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ../../../../public/pirate/GLBformat/patch-grass.glb -t -k 
*/

import * as THREE from "three";
import { type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
type GLTFResult = GLTF & {
  nodes: {
    ["patch-grass_1"]: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "public/pirate/GLBformat/patch-grass.glb"
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        name="patch-grass_1"
        geometry={nodes["patch-grass_1"].geometry}
        material={materials.colormap}
      />
    </group>
  );
}

useGLTF.preload("public/pirate/GLBformat/patch-grass.glb");
