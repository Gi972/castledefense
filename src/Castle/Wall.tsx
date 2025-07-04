/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 wall.glb -t -k 
*/

import * as THREE from "three";
import { type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import meshUrl from "/castle/GLB_format/wall.glb";

type GLTFResult = GLTF & {
  nodes: {
    wall_1: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

export function Wall(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(meshUrl) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        name="wall_1"
        geometry={nodes.wall_1.geometry}
        material={materials.colormap}
      />
    </group>
  );
}

useGLTF.preload(meshUrl);
