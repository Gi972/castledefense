import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas dpr={[1.5, 2]} shadows>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
