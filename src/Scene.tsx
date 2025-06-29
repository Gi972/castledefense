import { useCallback, useMemo, useRef, useState } from "react";
import { GizmoHelper, GizmoViewport, Stats } from "@react-three/drei";
import GridHelper from "./Helper";
import CameraMan from "./Cameraman";
import { Lights } from "./Light";
export default function Scene() {
  return (
    <>
      <CameraMan />
      <Lights />
      <GridHelper />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
          labelColor="white"
        />
      </GizmoHelper>
      <Stats />
    </>
  );
}
