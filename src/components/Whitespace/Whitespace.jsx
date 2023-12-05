// import { Repeat } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { dontClickInputText } from "../../redux/clickTextSlice";
import { dontClickImage } from "../../redux/clickImageSlice";
import Element from "./Element";
import Customize from "../Customize/Customize";
import { dontClickInputUrl } from "../../redux/clickURLSlice";
import { dontClickRecord } from "../../redux/clickRecordSlice";
import { dontClickVideo } from "../../redux/clickVideoSlice";
import { dontClickAudio } from "../../redux/clickAudioSlice";
import { onTypeModel } from "../../redux/typeModelSlice";

function Whitespace(props) {
  const dispatch = useDispatch();
  const [update2, setUpdate2] = useState(0);
  const [isOpenCustomize, setIsOpenCustomize] = useState(false);
  const [DataOpenCustomize, setDataOpenCustomize] = useState({
    tools: [],
    title: "",
  });

  // const [selected, setSelected] = useState();
  const handleOpenCustomize = (typeModel) => {
    dispatch(onTypeModel(typeModel))
    setIsOpenCustomize(true);
    setDataOpenCustomize((data) => {
      // console.log(m);
      data.title = typeModel;

      switch (typeModel) {
        case "Text":
          data.tools = ["Text to speech", "Text to image"];
          break;
        case "Image":
          data.tools = ["Image to text", "Image to ..."];
          break;
        case "Video":
          data.tools = ["Video to text", "Video to ..."];
          break;
        case "Audio":
          data.tools = ["Audio to text", "Audio to ..."];
          break;
        case "Record":
          data.tools = ["Record to text", "Record to ..."];
          break;
        case "URL":
          data.tools = ["URL to text", "URL to ..."];
          break;
        default:
          break;
      }
      return data;
    });
  };
  const renderedElements = props.data?.map((typeBlock) => (
    <>
      {typeBlock.list?.length > 0 &&
        typeBlock.list?.map((element, index) => (
          <Element
            type={element.type}
            key={index}
            coor={element}
            updateCoors={props.updateElement}
            openCustomize={handleOpenCustomize}
          />
        ))}
    </>
  ));
  useEffect(() => {
    setUpdate2((prev) => prev + 1);
  }, [props.update]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        props.data?.map((typeBlock, idx1) => {
          typeBlock.list?.map((item, idx2) => {
            if (item.isSelected) {
              // console.log("check:", item,idx1,idx2)
              removeElement(idx1, idx2);
              dispatch(dontClickInputText());
              dispatch(dontClickImage());
              dispatch(dontClickInputUrl());
              dispatch(dontClickRecord());
              dispatch(dontClickVideo());
              dispatch(dontClickAudio());
            }
          });
        });
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          props.data?.map((typeBlock, idx1) => {
            typeBlock.list?.map((item, idx2) => {
              if (item.isSelected) {
                removeElement(idx1, idx2);
                dispatch(dontClickInputText());
                dispatch(dontClickImage());
                dispatch(dontClickInputUrl());
                dispatch(dontClickRecord());
                dispatch(dontClickVideo());
                dispatch(dontClickAudio());
              }
            });
          });
        }
      });
    };
  }, [props.data]);

  const removeElement = (idx1, idx2) => {
    var data = props.data;
    data[idx1]?.list?.splice(idx2, 1);
    props.setData(data);
  };

  return (
    <div className="w-full bg-repeat whitespace overflow-hidden" id="boxDrop">
      <div
        className="w-full"
        style={{
          backgroundColor: "rgba(255,255,255,.6)",
          height: "100vh",
        }}
      >
        {isOpenCustomize && (
          <Customize
            title={DataOpenCustomize.title}
            tools={DataOpenCustomize.tools}
          />
        )}
        {renderedElements}
      </div>
    </div>
  );
}

export default Whitespace;
