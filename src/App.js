import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Audio, Video, Image } from "./components/Input/Media";
import { TextInput, URLInput } from "./components/Input/Text";
import Record from "./components/Input/Record";
import Header from "./components/Header/Header";
import Whitespace from "./components/Whitespace/Whitespace";
import { Droppable } from "react-drag-and-drop";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { onClickDataIdType } from "./redux/clickDataIdType";
import { switchCase } from "@babel/types";

function App() {
  const dispatch = useDispatch();

  const [defaultPosition, setDefaultPosition] = useState({
    x: 0,
    y: 0,
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

  const onDrop = (value, e) => {
    e.stopPropagation();
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
  const arrRef = [];
  const getchild = (type) => {
    let input;
    const refBox = React.createRef();
    arrRef.push(refBox);
    switch (type) {
      case "Text":
        input = <TextInput ref={refBox} />;
        break;
      case "URL":
        input = <URLInput />;
        break;
      case "Audio":
        input = <Audio />;
        break;
      case "Video":
        input = <Video />;
        break;
      case "Image":
        input = <Image />;
        break;
      case "Record":
        input = <Record />;
        break;
      default:
        input = null; // or any other default value
    }
    return input;
  };

  const addElement = (typeName) => {
    console.log("add");
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
        z: 0,
        // children: (
        //   <>
        //     {nameType.map((item) => {
        //       if (item.name === typeName) {
        //         return <>{item.input}</>;
        //       }
        //     })}
        //   </>
        // ),
        children: getchild(typeName),
      };
      // const newData = [...prevData];
      let typeFound = prev.find((type) => type.typeName === typeName);
      // Not found type
      if (!typeFound) {
        typeFound = {
          typeId: data.length + 1,
          typeName,
          list: [{ ...newEl, id: 1, z: data.length + 1 }],
        };
        prev.push(typeFound);
        return prev;
      }
      // Found type
      else {
        // return prev;
        typeFound.list.push({
          ...newEl,
          id: typeFound.list.length + 1,
          z: data.length + 1,
        });
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
  useEffect(() => {
    const data1 = data.map((item) => item.list);
    const allTypes = data1.flatMap((innerArray) =>
      innerArray.map((obj) => obj.type)
    );
    const allId = data1.flatMap((innerArray) =>
      innerArray.map((obj) => obj.id)
    );
    const allTypesFromSecond = allTypes.slice(1);
    const allIdFromSecond = allId.slice(1);
    dispatch(onClickDataIdType({ allTypesFromSecond, allIdFromSecond }));
  }, [data]);

  const toolbox = useSelector((state) => state.toolbox.value);

  return (
    <div
      className="w-full h-screen bg-body relative flex flex-col items-stretch overflow-auto scrollar-cus
      "
      id="ws-container">
      <div>
        <Header />
      </div>
      <div className="w-full">
        <Droppable
          types={["components"]} // <= allowed drop types
          onDrop={onDrop}>
          <Whitespace
            data={data}
            setData={setData}
            update={update}
            updateElement={updateElement}
          />
        </Droppable>
      </div>
      {/* </div> */}
      <Draggable disabled={!toolbox}>
        <div className="fixed z-20 bottom-0 left-0 right-0 flex justify-center items-center ">
          <Navbar
            data={data}
            addElement={addElement}
            setDefaultPosition={setDefaultPosition}
          />
        </div>
      </Draggable>
    </div>
  );
}

export default App;
