import { React } from "react";
import { useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";

export default function Rocket(props) {
  const { nodes } = useGLTF("/Rocket/scene.gltf");
  const snap = useSnapshot(props.colors);

  return (
    <group
      {...props}
      dispose={null}
      scale={[0.002, 0.002, 0.002]}
      rotation={[-Math.PI / 3 + 0.5, 0, -Math.PI / 2 + 0.3]}
      position={[0.5, 0, 0.5]}
      onPointerDown={(e) => {
        e.stopPropagation();
        props.updateCurrent(e.object.material.name);
      }}
      onPointerMissed={() => {
        props.updateCurrent(null);
      }}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[735.89, 495.83, 692.58]}
            rotation={[Math.PI, 0.76, 2.68]}
            scale={100}
          />
          <group
            position={[-37.57, -223.59, 77.18]}
            rotation={[-1.57, -0.01, 0.01]}
            scale={[103.84, 108.84, 476.71]}
          >
            <mesh castShadow geometry={nodes.Sphere__0.geometry}>
              <meshStandardMaterial color={snap.hull} name="hull" />
            </mesh>
          </group>
          <group
            position={[-44.14, -562.08, 77.18]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[112.9, 120.19, 120.19]}
          >
            <mesh geometry={nodes.Cylinder__0.geometry}>
              <meshStandardMaterial color={snap.base} name="base" />
            </mesh>
          </group>
          <group
            position={[-37.58, 198.03, 77.18]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[25.89, 120.19, 72.57]}
          >
            <mesh geometry={nodes.Sphere001__0.geometry}>
              <meshStandardMaterial color={snap.tip} name="tip" />
            </mesh>
          </group>
          <group
            position={[5.54, -555.21, -46.56]}
            rotation={[-Math.PI / 2, 0, 2.9]}
            scale={[33.29, 41.05, 67.48]}
          >
            <mesh geometry={nodes.Cube001__0.geometry}>
              <meshStandardMaterial color={snap.wings} name="wings" />
            </mesh>
          </group>
          <group
            position={[-175.48, -555.21, 92.53]}
            rotation={[-Math.PI / 2, 0, -1.38]}
            scale={[33.29, 41.05, 67.48]}
          >
            <mesh geometry={nodes.Cube002__0.geometry}>
              <meshStandardMaterial color={snap.wings} name="wings" />
            </mesh>
          </group>
          <group
            position={[27.08, -555.21, 197.81]}
            rotation={[-Math.PI / 2, 0, 0.63]}
            scale={[33.29, 41.05, 67.48]}
          >
            <mesh geometry={nodes.Cube003__0.geometry}>
              <meshStandardMaterial color={snap.wings} name="wings" />
            </mesh>
          </group>
          <group
            position={[-45.05, 156.5, 80.42]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh geometry={nodes.Cylinder002__0.geometry}>
              <meshStandardMaterial color={snap.tip} name="tip" />
            </mesh>
          </group>
          <group
            position={[-40.41, -99.49, 79.72]}
            rotation={[-0.05, -0.02, -1.58]}
            scale={[71.67, 71.67, 115.24]}
          >
            <mesh geometry={nodes.Cylinder003__0.geometry}>
              <meshStandardMaterial color={snap.window} name="window" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Rocket/scene.gltf");
