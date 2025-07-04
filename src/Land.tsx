/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./land.glb -types --keepnames --keepgroups 
*/

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./land.glb -types --keepnames --keepgroups
*/
import type { JSX, ReactNode } from "react";
import { WallNarrow } from "./Castle/Wall-narrow";
import { FlagBannerShort } from "./Castle/Flag-banner-short";
import { TreeLarge } from "./Castle/Tree-large";
import { MTrees, TreeSmall } from "./Castle/Tree-small";
import type { ThreeElements } from "@react-three/fiber";
import { WallCornerHalfTower } from "./Castle/Wall-corner-half-tower";
import { WallNarrowStairs } from "./Castle/Wall-narrow-stairs";
import { Gate } from "./Castle/Gate";
import { WallNarrowGate } from "./Castle/Wall-narrow-gate";
import { WallToNarrow } from "./Castle/Wall-to-narrow";
import { WallNarrowStairsRails } from "./Castle/Wall-narrow-stairs-rail";
import { WallPillar } from "./Castle/Wall-pillar";
import { WallConerHalf } from "./Castle/Wall-corner-half";
import { Wall } from "./Castle/Wall";
import { WallCornerSlant } from "./Castle/Wall-corner-slant";
import { TowerSquareBaseColor } from "./Castle/Tower-square-base-color";
import { TowerSlantRoof } from "./Castle/Tower-slant-roof";
import { BrideDraw } from "./Castle/Bridge-draw";
import { RocksLarge } from "./Castle/Rocks-large";
import { useControls } from "leva";

import { PatchSand } from "./Castle/Patch-sand";
import { RocksSmall } from "./Castle/Rocks-small";
import {
  degToRadStartStop,
  generateArcAnnulusPositionsWithDistance,
} from "./lib/math";

export function LandScape(
  props: JSX.IntrinsicElements["group"] & { hero: ReactNode }
) {
  return (
    <group {...props} dispose={null}>
      {props.children}
      <group name="Scene">
        <CastleWall />
        <Forest />
        <Tower
          hero={props.hero}
          position={[3.91, 0, 0.98]}
          rotation={[
            -2.7982624053781304, -1.5518478432668705, -2.7984850858530317,
          ]}
        />
      </group>
    </group>
  );
}

export function CastleWall() {
  return (
    <group
      name="Castle"
      position={[3.91, 0, 5.21]}
      rotation={[0, 1.5707963267948966, 0]}
    >
      <PatchSand
        position={[6.01, -0.23, 2.60274969005641]}
        scale={[1.74, 0.95, 1.8]}
      />
      <PatchSand
        position={[-9.19863570103075, -0.22, -19.31]}
        rotation={[0, -0.9599310885968813, 0]}
      />

      <WallCornerHalfTower
        position={[8.14, 0, 0.00861587832121291]}
        rotation={[0, 1.5707963267949, 0]}
      />
      <WallToNarrow
        position={[8.13875368967917, 0, 0.96]}
        rotation={[
          3.141592653589793, 2.4980018054066017e-16, -3.1415926535897927,
        ]}
      />

      <WallNarrow
        position={[8.15652533058199, 0, 3.71]}
        rotation={[3.141592653589793, -0.017453292519945075, 3.141592653589793]}
      />
      <WallNarrow
        position={[7.17, 0, 0.0111959906723946]}
        rotation={[0, -1.5707963267948966, 0]}
      />
      <WallCornerHalfTower
        position={[8.16551207482225, 0, 4.68]}
        rotation={[
          -1.2246467991473535e-16, 8.28503932126523e-15, 1.2246467991473535e-16,
        ]}
      />
      <WallCornerSlant
        position={[7.6683363042974, 0, 3.9]}
        rotation={[0, 1.5533430342749615, 0]}
      />

      <WallNarrow
        position={[5.2, 0, 0.0155060482195601]}
        rotation={[0, -1.5707963267948966, 0]}
      />
      <WallNarrowStairs
        position={[4.19754524809229, 0, 0.99]}
        rotation={[
          3.141592653589793, -1.2490009027033014e-16, 3.141592653589793,
        ]}
      />

      <WallNarrowStairsRails
        position={[8.17, 0, 2.90644801168798]}
        rotation={[
          -3.141592653589793, 2.4980018054066027e-16, -3.141592653589793,
        ]}
      />

      <TowerSlantRoof
        position={[6.13, 1, 2.90637838842338]}
        rotation={[0, 1.553343034274955, 0]}
      />
      <TowerSquareBaseColor position={[6.13, 0, 2.93972336529792]} />
      <TreeSmall position={[5.14034820309399, 0, 1.73]} />
      <WallNarrowGate
        position={[6.19, 0, 0.0142204861339232]}
        rotation={[0, 1.5707963267948966, 0]}
      />
      <Gate
        position={[6.16972726130578, 0, -0.48]}
        rotation={[3.141592653589793, -1.553343034274955, 3.141592653589793]}
      />

      <group name="CastleLeftWall" position={[0.608967054536858, 0, 0.92]}>
        <WallNarrow
          position={[7.5345014326453, 0, 1.01896705453686]}
          rotation={[
            -3.141592653589793, -0.017453292519943226, -3.141592653589793,
          ]}
        />
        <WallNarrow position={[3.61, 0, 0.89]} rotation={[0, 0, 0]} />
        <WallPillar position={[3.61, 0, 1.8]} rotation={[0, 0, 0]} />
        <WallPillar
          position={[3.61, 0, 2.8]}
          rotation={[
            3.141592653589793, -1.2246467991473532e-16, 3.141592653589793,
          ]}
        />
        <WallConerHalf
          position={[3.61, 0, 3.77]}
          rotation={[
            3.141592653589793, -1.2246467991473532e-16, 3.141592653589793,
          ]}
        />
        <Wall
          position={[4.60839710040731, 0, 3.76896705453686]}
          rotation={[-1.2246467991473535e-16, 1.5707963267948966, 0]}
        />
        <Wall
          position={[5.58602019424858, 0, 3.76896705453686]}
          rotation={[-1.2246467991473535e-16, 1.5707963267948966, 0]}
        />
        <Wall
          position={[6.56017897937098, 0, 3.76896705453686]}
          rotation={[-1.2246467991473535e-16, 1.5707963267948966, 0]}
        />
        <FlagBannerShort
          position={[3.07, 0.53, -0.17698744765316]}
          scale={0.5}
        />
        <FlagBannerShort
          position={[4.35900936496689, 0.53, -1.41103294546314]}
          scale={0.5}
          rotation={[0, -1.5358897417550172, 0]}
        />
        <FlagBannerShort
          position={[6.70230659444351, 0.53, -1.41103294546314]}
          scale={0.5}
          rotation={[0, -1.5358897417550172, 0]}
        />
        <FlagBannerShort
          position={[8.02, 0.53, 1.58811348228312]}
          scale={0.5}
          rotation={[
            3.141592653589793, -0.03490658503987947, 3.141592653589793,
          ]}
        />
      </group>

      <BrideDraw
        position={[6.16654347354107, 0, -0.56]}
        rotation={[3.141592653589793, -1.553343034274955, 3.141592653589793]}
      />
      <RocksLarge
        position={[10.4, 0, -19.6054452305556]}
        scale={[5.55, 3.46, 1]}
      />
      <RocksSmall position={[23.5087653094466, 0, -5.9]} />
    </group>
  );
}

export function Tower(props: ThreeElements["group"] & { hero: ReactNode }) {
  return (
    <group name="Tower" {...props}>
      {props.hero}
      <WallCornerHalfTower name="WallConerTowerRight" position={[0, 0, 0]} />
    </group>
  );
}

const [start, end] = degToRadStartStop(90, 300);
const data = generateArcAnnulusPositionsWithDistance(
  200,
  20,
  40,
  [0, 0, 0],
  start,
  end,
  1
);
const [start2, end2] = degToRadStartStop(150, 300);
const data2 = generateArcAnnulusPositionsWithDistance(
  200,
  120,
  150,
  [0, 0, 0],
  start2,
  end2,
  1
);

export function Forest() {
  const { range } = useControls("Itrees", {
    range: { value: 200, min: 0, max: 300, step: 10 },
  });

  return (
    <group name="Tree" position={[0, 0, 0]}>
      <TreeSmall
        name="tree-small001"
        castShadow
        receiveShadow
        position={[-2.38, 0, 1.867]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small002"
        castShadow
        receiveShadow
        position={[-4.72, 0, 2.351]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small003"
        castShadow
        receiveShadow
        position={[-4.16, 0, 2.648]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small004"
        castShadow
        receiveShadow
        position={[-4.6, 0, 2.899]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small005"
        castShadow
        receiveShadow
        position={[-2.79, 0, 3.371]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small006"
        castShadow
        receiveShadow
        position={[-2.27, 0, 3.821]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small007"
        castShadow
        receiveShadow
        position={[0.379, 0, 3.955]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small008"
        castShadow
        receiveShadow
        position={[0.157, 0, 4.293]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small009"
        castShadow
        receiveShadow
        position={[-0.18, 0, 5.44]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small010"
        castShadow
        receiveShadow
        position={[-5.2, 0, 1.423]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small011"
        castShadow
        receiveShadow
        position={[-4.38, 0, 0.84]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small012"
        castShadow
        receiveShadow
        position={[-4.38, 0, 0.84]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small013"
        castShadow
        receiveShadow
        position={[-6.21, 0, -2.98]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small014"
        castShadow
        receiveShadow
        position={[-4.38, 0, 0.84]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small015"
        castShadow
        receiveShadow
        position={[-4.99, 0, -1.85]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small016"
        castShadow
        receiveShadow
        position={[-6.29, 0, -4.41]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small017"
        castShadow
        receiveShadow
        position={[-6.79, 0, 0.61]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small018"
        castShadow
        receiveShadow
        position={[-7.12, 0, 1.97]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small019"
        castShadow
        receiveShadow
        position={[-5.95, 0, 0.84]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small020"
        castShadow
        receiveShadow
        position={[-6.7, 0, -0.47]}
        scale={0.5}
      />
      <TreeSmall
        name="tree-small021"
        castShadow
        receiveShadow
        position={[1.59, 0, 5.54]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large001"
        castShadow
        receiveShadow
        position={[-3.41, 0, -3.05]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large002"
        castShadow
        receiveShadow
        position={[-1.34, 0, 3.68]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large003"
        castShadow
        receiveShadow
        position={[-5.47, 0, 0.57]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large004"
        castShadow
        receiveShadow
        position={[-2.12, 0, 2.74]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large005"
        castShadow
        receiveShadow
        position={[-3.03, 0, 0.94]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large006"
        castShadow
        receiveShadow
        position={[-2.96, 0, 1.896]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large007"
        castShadow
        receiveShadow
        position={[-3.54, 0, -1.12]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large008"
        castShadow
        receiveShadow
        position={[-3.23, 0, -0.77]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large009"
        castShadow
        receiveShadow
        position={[-3.44, 0, 2.654]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large010"
        castShadow
        receiveShadow
        position={[-4.72, 0, -0.54]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large011"
        castShadow
        receiveShadow
        position={[-3.34, 0, 3.39]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large012"
        castShadow
        receiveShadow
        position={[-3.6, 0, 2.041]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large013"
        castShadow
        receiveShadow
        position={[-0.356, 0, 4.194]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large014"
        castShadow
        receiveShadow
        position={[-1.283, 0, 4.439]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large015"
        castShadow
        receiveShadow
        position={[-5.92, 0, -1.49]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large016"
        castShadow
        receiveShadow
        position={[-3.12, 0, -2.24]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large017"
        castShadow
        receiveShadow
        position={[-5.47, 0, 4.1]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large018"
        castShadow
        receiveShadow
        position={[-2.53, 0, -4.86]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large019"
        castShadow
        receiveShadow
        position={[-2.85, 0, -4.09]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large020"
        castShadow
        receiveShadow
        position={[-3.86, 0, -2.33]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large021"
        castShadow
        receiveShadow
        position={[-3.86, 0, -2.33]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large022"
        castShadow
        receiveShadow
        position={[-3.86, 0, -2.33]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large023"
        castShadow
        receiveShadow
        position={[-3.86, 0, -2.33]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large024"
        castShadow
        receiveShadow
        position={[-3.86, 0, -2.33]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large025"
        castShadow
        receiveShadow
        position={[-3.86, 0, -2.33]}
        scale={0.5}
      />
      <TreeLarge
        name="tree-large026"
        castShadow
        receiveShadow
        position={[0.37, 0, 5.01]}
        scale={0.5}
      />

      <MTrees data={data} range={range} scale={0.3} />
      <MTrees data={data2} range={range} scale={0.1} />
    </group>
  );
}
