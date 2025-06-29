import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ height: "100vh" }}>
      <Canvas dpr={[1.5, 2]} shadows>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
