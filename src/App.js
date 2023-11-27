import React, { useState } from "react";
import Customize from "./components/Customize/Customize";
import PopupDragFile from "./components/PopupDragFile/PopupDragFile";

function App() {
  const [toVoice, setToVoice] = useState(false);
  const typeImg = [".png", ".jpg"];

  return (
    <div className="w-full h-screen bg-body">
      {/* <button onClick={setToVoice}>To Voice</button>
      <button onClick={() => setToVoice(false)}>To Text</button>
      <Customize toVoice={toVoice} /> */}
      <PopupDragFile types={typeImg} />
    </div>
  );
}

export default App;
