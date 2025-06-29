import { useControls } from 'leva'

export function Lights() {
  const { position, rotation, intensity } = useControls('Lights', {
    position: { value: [2, 10, 1], step: 1 },
    rotation: { value: [0, 0, 0], step: 1 },
    intensity: { value: 550, step: 1 },
  })

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        castShadow
        penumbra={0.5}
        position={position}
        rotation={rotation}
        intensity={intensity}
      />
    </>
  )
}
