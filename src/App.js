import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Audio, Video, Image } from "./components/Input/Media";
import { TextInput, URLInput } from "./components/Input/Text";
import Record from "./components/Input/Record";
import Header from "./components/Header/Header";
import Whitespace from "./components/Whitespace/Whitespace";
import WhiteBoard from "./components/WhiteBoard/WhiteBoard";
import BotChat from "./components/BotChat/BotChat";
import Customize from "./components/Customize/Customize";

function App() {
  const [isOpenInputText, setIsOpenInputText] = useState(false);
  const [isOpenInputURL, setIsOpenInputURL] = useState(false);
  const [isOpenInputAudio, setIsOpenInputAudio] = useState(false);
  const [isOpenInputVideo, setIsOpenInputVideo] = useState(false);
  const [isOpenInputImage, setIsOpenInputImage] = useState(false);
  const [isOpenInputRecord, setIsOpenInputRecor] = useState(false);
  const [defaultPosition, setDefaultPosition] = useState({
    x: 100,
    y: 100,
  });
  const [defaultSize, setDefaultSize] = useState({
    w: 250,
    h: 150,
  });
  const [data, setData] = useState([
    {
      typeId: 1,
      typeName: "Image",
      list: [
        {
          id: 1,
          type: "Image",
          x: defaultPosition.x,
          y: defaultPosition.y,
          w: defaultSize.w,
          h: defaultSize.h,
          isSelected: false,
          z: 2,
          children: <Image />,
        },
      ],
    },
    {
      typeId: 2,
      typeName: "Video",
      list: [
        {
          id: 1,
          type: "Video",
          x: defaultPosition.x,
          y: defaultPosition.y,
          w: defaultSize.w,
          h: defaultSize.h,
          isSelected: false,
          z: 2,
          children: <Video />,
        },
      ],
    },
  ]);
  const [update, setUpdate] = useState(0);

  const addElement = (typeName) => {
    setData((prev) => {
      const newEl = {
        type: typeName,
        x: defaultPosition.x,
        y: defaultPosition.y,
        w: defaultSize.w,
        h: defaultSize.h,
        isSelected: false,
        z: 2,
        children: <></>,
      };
      let typeFound = prev.find((type) => type.typeName === typeName);
      // Not found type
      if (!typeFound) {
        typeFound = {
          typeId: data.length + 1,
          typeName,
          list: [{ ...newEl, id: 1 }],
        };
        prev.push(typeFound);
        return prev;
      }
      // Found type
      else {
        typeFound.list.push({ ...newEl, id: typeFound.list.length + 1 });
        return prev;
      }
    });
    setUpdate((prev) => prev + 1);
  };

  const updateElement = (type, id, values, syncValues) => {
    setData((prev) =>
      prev.map((typeBlock) => {
        // Update values inside this type Blockblock
        if (typeBlock.typeName === type) {
          typeBlock.list = typeBlock.list.map((el) => {
            if (el.id === id) return { ...el, ...values };
            if (syncValues) return { ...el, ...syncValues };
            return el;
          });
          return typeBlock;
        }
        if (syncValues) {
          typeBlock.list = typeBlock.list?.map((el) => {
            return { ...el, ...syncValues };
          });
          return typeBlock;
        }
        return typeBlock;
      })
    );
    setUpdate((prev) => prev + 1);
  };

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
          {isOpenInputText === true ? <TextInput /> : <></>}
          {isOpenInputURL === true ? <URLInput /> : <></>}
          {isOpenInputAudio === true ? <Audio /> : <></>}
          {isOpenInputVideo === true ? <Video /> : <></>}
          {isOpenInputImage === true ? <Image /> : <></>}
          {isOpenInputRecord === true ? <Record /> : <></>}
        </WhiteBoard>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
          <Navbar
            isOpenInputText={isOpenInputText}
            isOpenInputURL={isOpenInputURL}
            isOpenInputAudio={isOpenInputAudio}
            isOpenInputVide={isOpenInputVideo}
            isOpenInputImage={isOpenInputImage}
            isOpenInputRecord={isOpenInputRecord}
            setIsOpenInputText={setIsOpenInputText}
            setIsOpenInputURL={setIsOpenInputURL}
            setIsOpenInputAudio={setIsOpenInputAudio}
            setIsOpenInputVideo={setIsOpenInputVideo}
            setIsOpenInputImage={setIsOpenInputImage}
            setIsOpenInputRecor={setIsOpenInputRecor}
          />
        </div>
      </div>
      <div
        className="w-100"
        style={{ height: "calc(100vh - 232px)", backgroundColor: "#ececec" }}
      >
        <Whitespace
          data={data}
          setData={setData}
          update={update}
          updateElement={updateElement}
        />

        {/* <Video />
        <Image />
        <URLInput /> */}
      </div>
    </div>
  );
}

export default App;
