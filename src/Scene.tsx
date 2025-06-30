import { GizmoHelper, GizmoViewport, Html, Stats } from "@react-three/drei";
import GridHelper from "./Helper";
import CameraMan from "./Cameraman";
import { Lights } from "./Light";
import Plane from "./Ground";
import { Physics, type PublicApi } from "@react-three/cannon";
import { Mesh, Vector3 } from "three";
import { useCallback, useMemo, useRef, useState } from "react";
import { GAME_STATE, Victory, GameOver } from "./GameState";
import { generateArcPositions, randomIntInRange } from "./lib/math";
import { Enemy, Friend, type TargetState } from "./Actors";
import { Info, Score, type ScoreRef } from "./Score";
import { LandScape } from "./Land";
import Hero from "./Hero";
import { Stone } from "./Bullet";
import { Leva } from "leva";

const arenaConfig = {
  enemies: 60,
  friends: 5,
  radius: 6.1,
  position: new Vector3(-2, 0, 0),
  arcAngle: 3,
  startAngle: 1.6,
  minDistance: 0.5,
};

const MAX_STONES = 20;

type ValueOf<T> = T[keyof T];

const DEBUG = false;
export default function Scene() {
  const aimRef = useRef<Mesh>(null!);
  const aimPoint = useRef<Vector3>(new Vector3(0, 0.5, -5));
  const refScore = useRef<ScoreRef>(null);

  let [gameState, setGameState] = useState<ValueOf<typeof GAME_STATE>>(
    GAME_STATE.GAMEPLAY
  );

  const [enemies, setEnemies] = useState<TargetState[]>(() =>
    generateArcPositions(
      arenaConfig.enemies,
      arenaConfig.radius,
      arenaConfig.arcAngle,
      arenaConfig.startAngle,
      arenaConfig.minDistance,
      "orange",
      undefined,
      arenaConfig.position
    ).map((target) => ({
      ...target,
      life: randomIntInRange(3, 10),
      saved: false,
    }))
  );

  const [friends, setFriends] = useState<TargetState[]>(() =>
    generateArcPositions(
      arenaConfig.friends,
      arenaConfig.radius,
      arenaConfig.arcAngle,
      arenaConfig.startAngle,
      arenaConfig.minDistance,
      "#2b7fff",
      undefined,
      arenaConfig.position
    ).map((target) => ({
      ...target,
      life: randomIntInRange(1, 3),
      saved: false,
    }))
  );

  const stonesData = useMemo(
    () =>
      Array.from({ length: MAX_STONES }).map((_, i) => ({
        id: i,
        active: false,
      })),
    []
  );

  const [stones, setStones] = useState(stonesData);
  const stoneApiRefs = useRef<PublicApi[]>([]);
  const nextStoneIndex = useRef(0);

  const returnToPool = (id: number) => {
    stoneApiRefs.current[id]?.sleep();
    setStones((prevStones) =>
      prevStones.map((s) => (s.id === id ? { ...s, active: false } : s))
    );
  };

  const handleCollision = useCallback(
    (event: any) => {
      const { body, target } = event;
      if (body.userData?.name === "ground") {
        return;
      }

      const handleHit = (targetId: string, stoneId: number) => {
        setEnemies((prev) =>
          prev.map((t) => {
            if (t.id === targetId) {
              if (t.life == 1) {
                refScore.current?.add(10);
              }
              return { ...t, life: t.life - 1 };
            }

            return t;
          })
        );
        setFriends((prev) =>
          prev.map((t) => (t.id === targetId ? { ...t, life: t.life - 1 } : t))
        );
        returnToPool(stoneId);
        setEnemies((prev) => prev.filter((t) => t.life > 0));
        setFriends((prev) => prev.filter((t) => t.life > 0));
      };

      if (body.userData.type === "enemy" && target.userData.type === "stone") {
        handleHit(body.userData.id, target.userData.id);
      }

      if (body.userData.type === "friend" && target.userData.type === "stone") {
        handleHit(body.userData.id, target.userData.id);
      }
    },

    []
  );

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    aimPoint.current?.copy(e.point);
  };

  const shoot = (e: any) => {
    e.stopPropagation();

    const index = nextStoneIndex.current;
    const stoneApi = stoneApiRefs.current[index];

    if (stoneApi) {
      const launcherPosition = new Vector3();
      aimRef.current.getWorldPosition(launcherPosition); //

      const launchDirection = new Vector3();
      aimRef.current.getWorldDirection(launchDirection);

      setStones((prevStones) =>
        prevStones.map((s) => (s.id === index ? { ...s, active: true } : s))
      );

      stoneApi.wakeUp();
      stoneApi.position.copy(launcherPosition);
      stoneApi.velocity.set(0, 0, 0);

      const launchForce = 30;
      const impulse = launchDirection.multiplyScalar(launchForce);
      stoneApi.applyImpulse([impulse.x, impulse.y, impulse.z], [0, 0, 0]);
      nextStoneIndex.current = (index + 1) % MAX_STONES;
    }
  };

  const restart = () => {
    setEnemies(() =>
      generateArcPositions(
        arenaConfig.enemies,
        arenaConfig.radius,
        arenaConfig.arcAngle,
        arenaConfig.startAngle,
        arenaConfig.minDistance,
        "orange",
        undefined,
        arenaConfig.position
      ).map((target) => ({ ...target, life: 3, saved: false }))
    );

    setFriends(
      generateArcPositions(
        arenaConfig.friends,
        arenaConfig.radius,
        arenaConfig.arcAngle,
        arenaConfig.startAngle,
        arenaConfig.minDistance,
        "blue",
        undefined,
        arenaConfig.position
      ).map((target) => ({ ...target, life: 3, saved: false }))
    );

    setGameState(GAME_STATE.GAMEPLAY);
  };

  const onSavedFriend = (id: any) => {
    setFriends(
      friends.map((f) => {
        if (f.id == id) {
          f.saved = true;
        }
        return f;
      })
    );
  };

  if (enemies.length === 0 && gameState !== GAME_STATE.VICTORY) {
    setGameState(GAME_STATE.VICTORY);
  }

  if (friends.length === 0 && gameState !== GAME_STATE.GAME_OVER) {
    setGameState(GAME_STATE.GAME_OVER);
  }

  if (
    friends.length &&
    friends.every((f) => f.saved) &&
    gameState !== GAME_STATE.VICTORY
  ) {
    setGameState(GAME_STATE.VICTORY);
  }

  return (
    <>
      <Html
        fullscreen
        // position={[0, 0, 0]}
        style={{ fontSize: 60 }}
      >
        <div style={{ color: "black", marginLeft: 20 }}>CASTLE DEFENSE</div>
      </Html>
      <CameraMan />
      <Lights />
      {gameState == GAME_STATE.VICTORY.toString() && (
        <Victory onClick={restart} />
      )}
      {gameState == GAME_STATE.GAME_OVER.toString() && (
        <GameOver onClick={restart} />
      )}
      <LandScape hero={<Hero ref={aimRef} aimPoint={aimPoint.current} />}>
        <Info friends={friends.length} enemies={enemies.length}>
          <Score ref={refScore} />
        </Info>
      </LandScape>
      <Physics>
        <Plane onShoot={shoot} onPointerMove={handlePointerMove} />
        {enemies.map((target) => (
          <Enemy
            key={target.id}
            {...target}
            gameplay={() => {
              setGameState(GAME_STATE.GAME_OVER);
            }}
          />
        ))}
        {friends.map((target) => (
          <Friend
            key={target.id}
            {...target}
            gameplay={(id) => {
              onSavedFriend(id);
            }}
          />
        ))}
        {stones.map((stone, i) => (
          <Stone
            key={stone.id}
            id={stone.id}
            active={stone.active}
            onCollide={handleCollision}
            ref={(el) => {
              if (el) {
                stoneApiRefs.current[i] = el;
              }
            }}
            returnToPool={returnToPool}
          />
        ))}
      </Physics>
      {DEBUG ? (
        <>
          <GridHelper />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
              labelColor="white"
            />
          </GizmoHelper>
          <Stats />
        </>
      ) : null}
      <Leva hidden />
    </>
  );
}
