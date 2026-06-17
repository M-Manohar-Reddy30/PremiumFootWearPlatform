import { Canvas } from "@react-three/fiber";
import {
  Float,
  OrbitControls
} from "@react-three/drei";

function LuxuryObject() {

  return (

    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >

      <mesh>

        <icosahedronGeometry
          args={[2, 0]}
        />

        <meshPhysicalMaterial

            metalness={1}

            roughness={0}

            clearcoat={1}

            reflectivity={1}

        />

      </mesh>

    </Float>

  );

}

export default function Hero3D() {

  return (

    <Canvas
      camera={{
        position: [0, 0, 7]
      }}
    >

      <ambientLight
        intensity={1.5}
      />

      <directionalLight
        position={[5,5,5]}
        intensity={3}
      />

      <LuxuryObject />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={2}
      />

    </Canvas>

  );

}