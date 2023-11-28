import React, { useState } from "react";
import Customize from "./components/Customize/Customize";
import PopupDragFile from "./components/PopupDragFile/PopupDragFile";
import Navbar from "./components/TransferTools/Navbar";
import Text from "./components/Input/Text";
import Media from "./components/Input/MediaBase";
import { Audio, Video, Image } from "./components/Input/Media";
import { TextInput, URLInput } from "./components/Input/Text";
import Record from "./components/Input/Record";

function App() {
  const [toVoice, setToVoice] = useState(false);

  return (
    <div className="w-full h-screen bg-body">
      <Audio />
      <Video />
      <Image />
      <TextInput />
      <URLInput />
      <Record />
    </div>
  );
}

export default App;
