import React from "react";

const ModelPicker = ({ updateSelectedModel }) => {
  return (
    <>
      <div className="model-selector">
        <button onClick={() => updateSelectedModel("Shoe")}>Shoe</button>
        <button onClick={() => updateSelectedModel("Rocket")}>Rocket</button>
      </div>
    </>
  );
};

export default ModelPicker;
