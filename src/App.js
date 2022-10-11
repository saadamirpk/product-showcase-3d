import { React, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { HexColorPicker } from "react-colorful";

const state = proxy({
  current: null,
  colors: {
    laces: "#fff",
    mesh: "#fff",
    caps: "#fff",
    inner: "#fff",
    sole: "#fff",
    stripes: "#fff",
    band: "#fff",
    patch: "#fff",
  },
});

function ColorPicker() {
  const snap = useSnapshot(state);
  return (
    <div
      className={
        state.current !== null ? "color-picker" : "color-picker hidden"
      }
    >
      <HexColorPicker
        color={snap.colors[snap.current]}
        onChange={(color) => (state.colors[state.current] = color)}
      />
      <h1>{snap.current}</h1>
    </div>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Shoe({ ...props }) {
  const shoeModel = useRef();
  const { nodes, materials } = useGLTF("shoe.gltf");
  const snap = useSnapshot(state.colors);
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
        state.current = e.object.material.name;
      }}
      onPointerMissed={() => {
        state.current = null;
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

function App() {
  return (
    <>
      <ColorPicker />
      <Canvas shadows camera={{ position: [1, 0, 2] }}>
        <ambientLight />
        <spotLight
          intensity={0.5}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 1.1]}
          position={[0, -1, 0]}
        >
          <planeBufferGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        <Suspense fallback={<Loader />}>
          <Shoe castShadow />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
