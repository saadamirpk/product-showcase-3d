import { React, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { proxy } from "valtio";
import Shoe from "./Components/Shoe";
import Loader from "./Components/Loader";
import ColorPicker from "./Components/ColorPicker";

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

function App() {
  const updateCurrent = (value) => {
    state.current = value;
  };
  const updateColor = (pro, value) => {
    state.colors[pro] = value;
  };
  return (
    <>
      <ColorPicker state={state} updateColor={updateColor} />
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
          <Shoe
            castShadow
            colors={state.colors}
            updateCurrent={updateCurrent}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
