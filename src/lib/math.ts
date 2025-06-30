import { nanoid } from "nanoid";
import { Euler, Vector3 } from "three";

type TargetState = {
  id: string;
  position: [number, number, number];
  color: string;
};

export function generateArcPositions(
  numTargets: number,
  radius: number,
  arcAngle: number,
  startAngle: number,
  minDistance: number,
  color: string,
  offset: number = 0.2,
  position: Vector3 = new Vector3(0, 0, 0),
  rotation: Euler = new Euler(0, 0, 0)
): TargetState[] {
  const targets: TargetState[] = [];
  const yOffset = 0.05;
  const maxAttempts = 1000;
  let attempts = 0;

  while (targets.length < numTargets && attempts < maxAttempts) {
    attempts++;

    const r = Math.sqrt(Math.random()) * (radius - offset);
    const angle = startAngle + Math.random() * arcAngle;
    const point = new Vector3(r * Math.cos(angle), 0, r * Math.sin(angle));

    point.applyEuler(rotation);
    point.add(position);

    const tooClose = targets.some((t) => {
      const targetPos = new Vector3(...t.position);
      return targetPos.distanceTo(point) < minDistance;
    });

    if (!tooClose) {
      targets.push({
        id: nanoid(),
        position: [point.x, point.y + yOffset, point.z],
        color: color,
      });
    }
  }

  if (attempts >= maxAttempts) {
    console.warn(
      `Could only place ${targets.length} targets after ${maxAttempts} attempts.`
    );
  }

  return targets;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function degToRadStartStop(
  start: number,
  end: number
): [number, number] {
  return [(start * Math.PI) / 180, (end * Math.PI) / 180];
}

type Vec3 = [number, number, number];

type Position3D = {
  position: Vec3;
};

function distance2D(a: Vec3, b: Vec3) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[2] - b[2]) ** 2);
}

/**
 * Génère des points dans un arc annulaire,
 * chaque point est séparé des autres d'au moins minDist
 */
export function generateArcAnnulusPositionsWithDistance(
  count: number, // nombre de points
  innerRadius: number, // inner radius
  outerRadius: number, // outer radius
  center: Vec3, // centre (x, y, z)
  startAngle: number, // angle début (30°)
  endAngle: number, // angle fin   (90°)
  minDist: number, // dist min
  maxTries = 10000 // Limite de tentatives
): Position3D[] {
  const positions: Position3D[] = [];
  let tries = 0;

  while (positions.length < count && tries < maxTries) {
    tries++;

    // Create point in arc
    const angle = startAngle + Math.random() * (endAngle - startAngle);
    const r = Math.sqrt(
      Math.random() * (outerRadius ** 2 - innerRadius ** 2) + innerRadius ** 2
    );
    const x = center[0] + Math.cos(angle) * r;
    const y = center[1];
    const z = center[2] + Math.sin(angle) * r;
    const candidate: Vec3 = [x, y, z];

    // tcheck the gap with other each points
    let ok = true;
    for (const pt of positions) {
      const dist = distance2D(candidate, pt.position);
      if (dist < minDist) {
        ok = false;
        break;
      }
    }

    if (ok || positions.length === 0) {
      positions.push({ position: candidate });
    }

    if (tries > maxTries) {
      console.warn(
        "Nombre de tentatives dépassé, résultat partiel:",
        positions.length
      );
      break;
    }
  }

  return positions;
}

export function randomIntInRange(min: number, max: number): number {
  // On s'assure que min et max sont bien des entiers
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  // Math.random() génère un nombre entre 0 inclus et 1 exclu
  // On adapte pour l'intervalle voulu et on arrondit vers le bas
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}
