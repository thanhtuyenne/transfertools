// import React, { useState } from "react";
// import Customize from "./components/Customize/Customize";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Text from "./components/Styles/Text/Text";

function App() {
  // const [toVoice, setToVoice] = useState(false);
  return (
    <div className="w-full h-screen bg-body relative">
      {/* <button onClick={setToVoice}>To Voice</button>
      <button onClick={() => setToVoice(false)}>To Text</button>
      <Customize toVoice={toVoice} /> */}
      <div>
        <Header />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center" >
        <Navbar />
      </div>
    </div>
  );
}

export default App;
