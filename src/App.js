import React, { useState } from "react";
import Customize from "./components/Customize/Customize";
import PopupDragFile from "./components/PopupDragFile/PopupDragFile";
import Navbar from "./components/Navbar/Navbar";
import Text from "./components/Input/Text";
import Media from "./components/Input/MediaBase";
import { Audio, Video, Image } from "./components/Input/Media";
import { TextInput, URLInput } from "./components/Input/Text";
import Record from "./components/Input/Record";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="w-full h-screen bg-body relative">
      {/* <button onClick={setToVoice}>To Voice</button>
      <button onClick={() => setToVoice(false)}>To Text</button>
      <Customize toVoice={toVoice} /> */}
      <div>
        <Header />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
        <Navbar />
      </div>
      <Video />
      <Image />
      <URLInput />
    </div>
  );
}

export default App;
