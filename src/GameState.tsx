import { Html, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { Confetti } from "./Confetti";

export const GAME_STATE = {
  MAIN_MENU: "MAIN_MENU",
  LOADING: "LOADING",
  GAMEPLAY: "GAMEPLAY",
  PAUSED: "PAUSED",
  GAME_OVER: "GAME_OVER",
  VICTORY: "VICTORY",
  SAVE: "SAVE",
  LOAD: "LOAD",
  CINEMATIC: "CINEMATIC",
  SETTINGS: "SETTINGS",
  DEBUG: "DEBUG",
  // multijoueur
  LOBBY: "LOBBY",
  MATCHMAKING: "MATCHMAKING",
  SPECTATOR: "SPECTATOR",
  DISCONNECTED: "DISCONNECTED",
};

export function Victory(props: { onClick: () => void }) {
  const refText = useRef<Mesh>(null);

  useFrame(({ camera }) => {
    if (refText.current) {
      refText.current.lookAt(camera.position);
    }
  });

  return (
    <Confetti>
      <Text
        ref={refText}
        position={[0, 1, 0]}
        fontSize={0.5}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        Success !
      </Text>
      <Html position={[-0.5, 1, 0]}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            props.onClick();
          }}
        >
          Retry
        </button>
      </Html>
    </Confetti>
  );
}

export function GameOver(props: { onClick: () => void }) {
  const refText = useRef<Mesh>(null);

  useFrame(({ camera }) => {
    if (refText.current) {
      refText.current.lookAt(camera.position);
    }
  });

  return (
    <>
      <Text
        ref={refText}
        position={[0, 1, 0]}
        fontSize={0.5}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {"You loose :-("}
      </Text>
      <Html position={[-0.5, 1, 0]}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            props.onClick();
          }}
        >
          Retry
        </button>
      </Html>
    </>
  );
}
