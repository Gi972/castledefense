import { GizmoHelper, GizmoViewport, Stats } from "@react-three/drei";
import GridHelper from "./Helper";
import CameraMan from "./Cameraman";
import { Lights } from "./Light";
import Plane from "./Ground";
import { Physics } from "@react-three/cannon";
export default function Scene() {
  return (
    <>
      <CameraMan />
      <Lights />
      <Physics>
        <Plane />
      </Physics>
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
