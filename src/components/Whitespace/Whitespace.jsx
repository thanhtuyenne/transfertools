// import { Repeat } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dontClickInputText } from "../../redux/clickTextSlice";
import { dontClickImage } from "../../redux/clickImageSlice";
import Element from "./Element";
import Customize from "../Customize/Customize";
import ToSpeech from "../Customize/ToSpeech";
import { dontClickInputUrl } from "../../redux/clickURLSlice";
import { dontClickRecord } from "../../redux/clickRecordSlice";
import { dontClickVideo } from "../../redux/clickVideoSlice";
import { dontClickAudio } from "../../redux/clickAudioSlice";
import { onTypeModel } from "../../redux/typeModelSlice";
import Preview from "../Customize/Preview";
import RightClickMenu from "../PopupDragFile/PopupContextMenu";

function Whitespace(props) {
  const dispatch = useDispatch();
  const [onDelete, setOnDelete] = useState(true);
  const [update2, setUpdate2] = useState(0);
  const [isOpenCustomize, setIsOpenCustomize] = useState(false);
  const [DataOpenCustomize, setDataOpenCustomize] = useState({
    tools: [],
    title: "",
  });
  const [focusElement, setFocusElement] = useState(null);
  // const [selected, setSelected] = useState();
  const handleOpenCustomize = (typeModel, element) => {
    if (focusElement === element) return;
    dispatch(onTypeModel(typeModel));
    setFocusElement(element);
    setIsOpenCustomize(true);
    setDataOpenCustomize((data) => {
      data.title = typeModel;
      switch (typeModel) {
        case "Text":
          data.tools = [
            {
              title: "Text to speech",
              comp: <ToSpeech />,
              preview: <Preview type="Speech" />,
            },
            {
              title: "Text to image",
              comp: <></>,
              preview: <Preview type="Image" />,
            },
          ];
          break;
        case "Image":
          data.tools = [
            {
              title: "Image to text",
              comp: <></>,
              preview: <Preview type="Text" />,
            },
            {
              title: "Image to video",
              comp: <></>,
              preview: <Preview type="Video" />,
            },
            {
              title: "Image to audio",
              comp: <></>,
              preview: <Preview type="Speech" />,
            },
          ];
          break;
        case "Video":
          data.tools = [
            {
              title: "Video to text",
              comp: <></>,
              preview: <Preview type="Text" />,
            },
          ];
          break;
        case "Audio":
          data.tools = [
            {
              title: "Speech to text",
              comp: <></>,
              preview: <Preview type="Text" />,
            },
            {
              title: "Speech to image",
              comp: <></>,
              preview: <Preview type="Image" />,
            },
          ];
          break;
        case "URL":
          data.tools = [
            {
              title: "URL to ...",
              comp: <></>,
              preview: <></>,
            },
          ];
          break;
        case "Record":
          data.tools = [
            {
              title: "Record to text",
              comp: <></>,
              preview: <Preview type="Text" />,
            },
            {
              title: "Record to video",
              comp: <></>,
              preview: <Preview type="Video" />,
            },
          ];
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
          <RightClickMenu setOnDelete={setOnDelete}>
            <Element
              type={element.type}
              key={index}
              coor={element}
              updateCoors={props.updateElement}
              openCustomize={handleOpenCustomize}
            />
          </RightClickMenu>
        ))}
    </>
  ));
  useEffect(() => {
    setUpdate2((prev) => prev + 1);
  }, [props.update]);

  useEffect(() => {
    if (onDelete === false) {
      props.data?.map((typeBlock, idx1) => {
        typeBlock.list?.map((item, idx2) => {
          if (item.isSelected) {
            setIsOpenCustomize(false);
            // console.log("check:", item,idx1,idx2)
            removeElement(idx1, idx2);
            setOnDelete(true);
          }
        });
      });
    }

    return () => {
      if (onDelete === false) {
        props.data?.map((typeBlock, idx1) => {
          typeBlock.list?.map((item, idx2) => {
            if (item.isSelected) {
              removeElement(idx1, idx2);
            }
          });
        });
      }
    };
  }, [onDelete]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        props.data?.map((typeBlock, idx1) => {
          typeBlock.list?.map((item, idx2) => {
            if (item.isSelected) {
              setIsOpenCustomize(false);
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
            // isOpen={setIsOpenCustomize}
          />
        )}
        {renderedElements}
      </div>
    </div>
  );
}

export default Whitespace;
