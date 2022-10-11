import { React, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";

export default function Shoe(props) {
  const shoeModel = useRef();
  const { nodes, materials } = useGLTF("shoe.gltf");
  const snap = useSnapshot(props.colors);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    shoeModel.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    shoeModel.current.rotation.x = Math.cos(t / 4) / 8;
    shoeModel.current.rotation.y = Math.sin(t / 4) / 8;
    shoeModel.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });
  return (
    <group
      ref={shoeModel}
      {...props}
      dispose={null}
      onPointerDown={(e) => {
        e.stopPropagation();
        props.updateCurrent(e.object.material.name);
      }}
      onPointerMissed={() => {
        props.updateCurrent(null);
      }}
    >
      <mesh
        castShadow
        material-color={snap.laces}
        geometry={nodes.shoe.geometry}
        material={materials.laces}
      />
      <mesh
        castShadow
        material-color={snap.mesh}
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
      />
      <mesh
        castShadow
        material-color={snap.caps}
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
      />
      <mesh
        castShadow
        material-color={snap.inner}
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
      />
      <mesh
        castShadow
        material-color={snap.sole}
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
      />
      <mesh
        castShadow
        material-color={snap.stripes}
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
      />
      <mesh
        castShadow
        material-color={snap.band}
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
      />
      <mesh
        castShadow
        material-color={snap.patch}
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
      />
    </group>
  );
}

useGLTF.preload("shoe.gltf");
