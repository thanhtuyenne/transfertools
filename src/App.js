import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Audio, Video, Image } from "./components/Input/Media";
import { TextInput, URLInput } from "./components/Input/Text";
import Record from "./components/Input/Record";
import Header from "./components/Header/Header";
import WhiteBoard from "./components/WhiteBoard/WhiteBoard";

function App() {
  const [isOpenInputText, setIsOpenInputText] = useState(false)
  const [isOpenInputURL, setIsOpenInputURL] = useState(false)
  const [isOpenInputAudio, setIsOpenInputAudio] = useState(false)
  const [isOpenInputVideo, setIsOpenInputVideo] = useState(false)
  const [isOpenInputImage, setIsOpenInputImage] = useState(false)
  const [isOpenInputRecord, setIsOpenInputRecor] = useState(false)


  return (
    <div className="w-full h-screen bg-body relative flex flex-col items-stretch">
      {/* <button onClick={setToVoice}>To Voice</button>
      <button onClick={() => setToVoice(false)}>To Text</button>
      <Customize toVoice={toVoice} /> */}
      <div>
        <Header />
      </div>
      <div>
        <WhiteBoard>
          {
            isOpenInputText === true ? <TextInput /> : <></>
          }
          {
            isOpenInputURL === true ? <URLInput /> : <></>
          }
          {
            isOpenInputAudio === true ? <Audio /> : <></>
          }
          {
            isOpenInputVideo === true ? <Video /> : <></>
          }
          {
            isOpenInputImage === true ? <Image /> : <></>
          }
          {
            isOpenInputRecord === true ? <Record /> : <></>
          }
        </WhiteBoard>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
          <Navbar
            setIsOpenInputText={setIsOpenInputText}
            setIsOpenInputURL={setIsOpenInputURL}
            setIsOpenInputAudio={setIsOpenInputAudio}
            setIsOpenInputVideo={setIsOpenInputVideo}
            setIsOpenInputImage={setIsOpenInputImage}
            setIsOpenInputRecor={setIsOpenInputRecor}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
