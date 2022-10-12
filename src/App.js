import { React, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { proxy } from "valtio";
import Shoe from "./Components/Shoe";
import Rocket from "./Components/Rocket";
import Loader from "./Components/Loader";
import ModelPicker from "./Components/ModelPicker";
import ColorPicker from "./Components/ColorPicker";

const RocketState = proxy({
  current: null,
  colors: {
    hull: "#d3d3d3",
    base: "#d3d3d3",
    tip: "#d3d3d3",
    wings: "#d3d3d3",
    window: "#d3d3d3",
  },
});
const ShoeState = proxy({
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
  const [selectedModel, setSelectedModel] = useState("Shoe");
  const updateShoeCurrent = (value) => {
    ShoeState.current = value;
  };
  const updateShoeColor = (pro, value) => {
    ShoeState.colors[pro] = value;
  };

  const updateRocketCurrent = (value) => {
    RocketState.current = value;
  };
  const updateRocketColor = (pro, value) => {
    RocketState.colors[pro] = value;
  };

  const renderSelectedModel = () => {
    switch (selectedModel) {
      case "Shoe":
        return (
          <Shoe
            castShadow
            colors={ShoeState.colors}
            updateCurrent={updateShoeCurrent}
          />
        );
      case "Rocket":
        return (
          <Rocket
            castShadow
            colors={RocketState.colors}
            updateCurrent={updateRocketCurrent}
          />
        );
      default:
        break;
    }
  };

  const renderSelectedColorPicker = () => {
    switch (selectedModel) {
      case "Shoe":
        return <ColorPicker state={ShoeState} updateColor={updateShoeColor} />;
      case "Rocket":
        return (
          <ColorPicker state={RocketState} updateColor={updateRocketColor} />
        );
      default:
        break;
    }
  };

  const updateSelectedModel = (selectedModel) => {
    setSelectedModel(selectedModel);
  };

  return (
    <>
      <ModelPicker updateSelectedModel={updateSelectedModel} />
      {renderSelectedColorPicker()}
      <Canvas shadows camera={{ position: [1, 0, 2] }}>
        <ambientLight />
        <spotLight
          intensity={0.5}
          penumbra={1}
          position={[7, 15, 10]}
          castShadow
        />
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 1.1]}
          position={[0, -1, 0]}
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        <Suspense fallback={<Loader />}>
          <Float
            speed={1}
            rotationIntensity={1}
            floatIntensity={1}
            floatingRange={[0, 0.3]}
          >
            {renderSelectedModel()}
          </Float>
        </Suspense>
        <OrbitControls maxDistance={5} minDistance={1.5} />
      </Canvas>
    </>
  );
}

export default App;
