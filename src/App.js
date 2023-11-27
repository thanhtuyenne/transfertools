import React, { useState } from "react";
import Customize from "./components/Customize/Customize";

function App() {
  const [toVoice, setToVoice] = useState(false);
  return (
    <div className="w-full h-screen bg-body">
      <button onClick={setToVoice}>To Voice</button>
      <button onClick={() => setToVoice(false)}>To Text</button>
      <Customize toVoice={toVoice} />
    </div>
  );
}

export default App;
