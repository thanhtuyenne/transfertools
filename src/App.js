import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Audio, Video, Image } from "./components/Input/Media";
import { TextInput, URLInput } from "./components/Input/Text";
import Record from "./components/Input/Record";
import Header from "./components/Header/Header";
import Whitespace from "./components/Whitespace/Whitespace";
import { Droppable } from "react-drag-and-drop";

// import BotChat from "./components/BotChat/BotChat";
// import Customize from "./components/Customize/Customize";
// import Drag from "./components/drag/Drag";

function App() {
  const [isOpenInputText, setIsOpenInputText] = useState(false);
  const [isOpenInputURL, setIsOpenInputURL] = useState(false);
  const [isOpenInputAudio, setIsOpenInputAudio] = useState(false);
  const [isOpenInputVideo, setIsOpenInputVideo] = useState(false);
  const [isOpenInputImage, setIsOpenInputImage] = useState(false);
  const [isOpenInputRecord, setIsOpenInputRecor] = useState(false);

  const [defaultPosition, setDefaultPosition] = useState({
    x: 100,
    y: 500,
  });
  const [defaultSize, setDefaultSize] = useState({
    w: 250,
    h: 150,
  });

  const [data, setData] = useState([
    {
      typeId: 1,
      typeName: "none",
      list: [
        {
          id: 0,
          type: "none",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          isSelected: false,
          z: 0,
          children: <></>,
        },
      ],
    },
  ]);

  const onDrop = (value) => {
    console.log("drop ", value);
    addElement(value.components);
  };
  const [update, setUpdate] = useState(0);
  const nameType = [
    {
      name: "Text",
      input: <TextInput />,
    },
    {
      name: "URL",
      input: <URLInput />,
    },
    {
      name: "Audio",
      input: <Audio />,
    },
    {
      name: "Video",
      input: <Video />,
    },
    {
      name: "Image",
      input: <Image />,
    },
    {
      name: "Record",
      input: <Record />,
    },
  ];
  const addElement = (typeName) => {
    setData((prev) => {
      const newEl = {
        type: typeName,
        x: defaultPosition.x,
        y: defaultPosition.y,
        w: defaultSize.w,
        h: defaultSize.h,
        mw: defaultSize.w,
        mh: defaultSize.h,
        isSelected: false,
        z: 2,
        children: (
          <>
            {nameType.map((item) => {
              if (item.name === typeName) {
                return <>{item.input}</>;
              }
            })}
          </>
        ),
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
        <div
          className="w-full"
          // style={{ height: "100vh", backgroundColor: "#ececec" }}
        >
          <Droppable
            types={["components"]} // <= allowed drop types
            onDrop={onDrop}
          >
            <Whitespace
              data={data}
              setData={setData}
              update={update}
              updateElement={updateElement}
            />
          </Droppable>
        </div>
      </div>
      <div className="fixed z-20 bottom-0 left-0 right-0 flex justify-center items-center ">
        <Navbar
          data={data}
          addElement={addElement}
          setDefaultPosition={setDefaultPosition}
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
  );
}

export default App;
