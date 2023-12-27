// import { Repeat } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataByIdText,
  dontClickInputText,
} from "../../redux/clickTextSlice";
import {
  deleteDataByIdImage,
  dontClickImage,
} from "../../redux/clickImageSlice";
import Element from "./Element";
import Customize from "../Customize/Customize";
import ToSpeech from "../Customize/ToSpeech";
import {
  deleteDataByIdUrl,
  dontClickInputUrl,
} from "../../redux/clickURLSlice";
import {
  deleteDataByIdRecord,
  dontClickRecord,
} from "../../redux/clickRecordSlice";
import {
  deleteDataByIdVideo,
  dontClickVideo,
} from "../../redux/clickVideoSlice";
import {
  deleteDataByIdAudio,
  dontClickAudio,
} from "../../redux/clickAudioSlice";
import { onTypeModel } from "../../redux/typeModelSlice";
import Preview from "../Customize/Preview";
import RightClickMenu from "../PopupDragFile/PopupContextMenu";
import { dontClickDelete } from "../../redux/clickDeletefile";
import { onClickSelectData } from "../../redux/clickSelectData";
import Tools from "../Customize/Tools";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { NotActiveTools } from "../../redux/activeToolsSlice";
import { Droppable } from "react-drag-and-drop";
import Xarrow, { Xwrapper } from "react-xarrows";

function Whitespace(props) {
  const deleteInput = useSelector((state) => state.clickDelete.value);
  const dispatch = useDispatch();
  const [onDelete, setOnDelete] = useState(true);
  const [update2, setUpdate2] = useState(0);
  const [isOpenCustomize, setIsOpenCustomize] = useState(false);
  const [DataOpenCustomize, setDataOpenCustomize] = useState({
    tools: [],
    title: "",
  });
  const [focusElement, setFocusElement] = useState(null);
  const tools = useSelector((tool) => tool.tools.value);
  const customize = useSelector((cus) => cus.customize.value);
  const [boxSelected, setBoxSelected] = useState();
  const onDrop = (value, e) => {
    e.stopPropagation();
    props.addElement(value.components);
  };
  const handleOpenCustomize = (typeModel, element) => {
    console.log(typeModel, element);
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
              result: "Audio",
            },
            {
              title: "Text to image",
              comp: <></>,
              preview: <Preview type="Image" />,
              result: "Image",
            },
          ];
          break;
        case "Image":
          data.tools = [
            {
              title: "Image to text",
              comp: <></>,
              preview: <Preview type="Text" />,
              result: "Text",
            },
            {
              title: "Image to video",
              comp: <></>,
              preview: <Preview type="Video" />,
              result: "Video",
            },
            {
              title: "Image to audio",
              comp: <></>,
              preview: <Preview type="Speech" />,
              result: "Audio",
            },
          ];
          break;
        case "Video":
          data.tools = [
            {
              title: "Video to text",
              comp: <></>,
              preview: <Preview type="Text" />,
              result: "Text",
            },
          ];
          break;
        case "Audio":
          data.tools = [
            {
              title: "Speech to text",
              comp: <></>,
              preview: <Preview type="Text" />,
              result: "Text",
            },
            {
              title: "Speech to image",
              comp: <></>,
              preview: <Preview type="Image" />,
              result: "Image",
            },
          ];
          break;
        case "URL":
          data.tools = [
            {
              title: "URL to ...",
              comp: <></>,
              preview: <></>,
              result: "",
            },
          ];
          break;
        case "Record":
          data.tools = [
            {
              title: "Record to text",
              comp: <></>,
              preview: <Preview type="Text" />,
              result: "Text",
            },
            {
              title: "Record to video",
              comp: <></>,
              preview: <Preview type="Video" />,
              result: "Video",
            },
          ];
          break;
        default:
          break;
      }
      console.log(data);
      return data;
    });
  };
  const [scaleValue, setScaleValue] = useState(1);
  const [boxRef, setBoxRef] = useState();

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
            wsScale={scaleValue}
            setBoxSelected={setBoxSelected}
            ref={element.boxRef}
            setBoxRef={setBoxRef}
          />
        ))}
    </>
  ));

  const paths = props.data?.map((typeBlock) => (
    <>
      {typeBlock.list?.length > 0 &&
        typeBlock.list
          .filter((element) => element.endpoint.length !== 0)
          .map((element, index) => {
            return element.endpoint
              .filter((ep) => ep.current !== null)
              .map((endpoint) => (
                <Xarrow start={element.boxRef} end={endpoint} />
              ));
          })}
    </>
  ));
  useEffect(() => {
    setUpdate2((prev) => prev + 1);
  }, [props.update]);

  useEffect(() => {
    if (deleteInput === true) {
      props.data?.map((typeBlock, idx1) => {
        typeBlock.list?.map((item, idx2) => {
          if (item.isSelected) {
            setIsOpenCustomize(false);
            // console.log("check:", item,idx1,idx2)
            removeElement(idx1, idx2);
            dispatch(dontClickDelete());
          }
        });
      });
    }

    return () => {
      if (deleteInput === true) {
        props.data?.map((typeBlock, idx1) => {
          typeBlock.list?.map((item, idx2) => {
            if (item.isSelected) {
              removeElement(idx1, idx2);
            }
          });
        });
      }
    };
  }, [deleteInput]);

  useEffect(() => {
    if (onDelete === false) {
      props.data?.map((typeBlock, idx1) => {
        typeBlock.list?.map((item, idx2) => {
          if (item.isSelected) {
            setIsOpenCustomize(false);
            // console.log("check:", item,idx1,idx2)
            removeElement(idx1, idx2);
            setOnDelete(true);
            switch (item.type) {
              case "Text":
                dispatch(deleteDataByIdText(item.id));
                break;
              case "Image":
                dispatch(deleteDataByIdImage(item.id));

                break;
              case "Video":
                dispatch(deleteDataByIdVideo(item.id));

                break;
              case "Audio":
                dispatch(deleteDataByIdAudio(item.id));

                break;
              case "URL":
                dispatch(deleteDataByIdUrl(item.id));

                break;
              case "Record":
                dispatch(deleteDataByIdRecord(item.id));

                break;
              default:
                break;
            }
            setIsOpenCustomize(false);
            // console.log("check:", item,idx1,idx2)
            removeElement(idx1, idx2);
          }
        });
      });
      return () => {
        if (onDelete === false) {
          props.data?.map((typeBlock, idx1) => {
            typeBlock.list?.map((item, idx2) => {
              if (item.isSelected) {
                removeElement(idx1, idx2);
                setOnDelete(true);
                switch (item.type) {
                  case "Text":
                    dispatch(deleteDataByIdText(item.id));
                    break;
                  case "Image":
                    dispatch(deleteDataByIdImage(item.id));

                    break;
                  case "Video":
                    dispatch(deleteDataByIdVideo(item.id));

                    break;
                  case "Audio":
                    dispatch(deleteDataByIdAudio(item.id));

                    break;
                  case "URL":
                    dispatch(deleteDataByIdUrl(item.id));

                    break;
                  case "Record":
                    dispatch(deleteDataByIdRecord(item.id));

                    break;
                  default:
                    break;
                }
                removeElement(idx1, idx2);
                setOnDelete(true);
              }
            });
          });
        }
      };
    }
  }, [onDelete]);

  const [i, setI] = useState({});

  useEffect(() => {
    props.data?.map((typeBlock, idx1) => {
      typeBlock.list?.map((item, idx2) => {
        if (item.isSelected) {
          // console.log("acnkanc:", item)
          const { id, type } = item;
          // setIsOpenCustomize(false);
          // // console.log("check:", item,idx1,idx2)
          // removeElement(idx1, idx2);
          // setOnDelete(true)
          dispatch(onClickSelectData({ id, type }));
          dispatch(NotActiveTools());
          setI(item);
          // setSelect(item.isSelected)
        }
      });
    });
    return () => {
      props.data?.map((typeBlock, idx1) => {
        // console.log("acnkanc:",typeBlock )
        typeBlock.list?.map((item, idx2) => {
          if (item.isSelected) {
            const { id, type } = item;
            // setIsOpenCustomize(false);
            // // console.log("check:", item,idx1,idx2)
            // removeElement(idx1, idx2);
            // setOnDelete(true)
            dispatch(onClickSelectData({ id, type }));
            dispatch(NotActiveTools());

            setI(item);
            // setSelect(item.isSelected)
          }
        });
      });
    };
  }, [props.data]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        props.data?.map((typeBlock, idx1) => {
          typeBlock.list?.map((item, idx2) => {
            if (item.isSelected) {
              setIsOpenCustomize(false);
              // console.log("check:", item,idx1,idx2)
              // removeElement(idx1, idx2);
              // dispatch(dontClickInputText());
              // dispatch(dontClickImage());
              // dispatch(dontClickInputUrl());
              // dispatch(dontClickRecord());
              // dispatch(dontClickVideo());
              // dispatch(dontClickAudio());
              switch (item.type) {
                case "Text":
                  dispatch(deleteDataByIdText(item.id));
                  break;
                case "Image":
                  dispatch(deleteDataByIdImage(item.id));

                  break;
                case "Video":
                  dispatch(deleteDataByIdVideo(item.id));

                  break;
                case "Audio":
                  dispatch(deleteDataByIdAudio(item.id));

                  break;
                case "URL":
                  dispatch(deleteDataByIdUrl(item.id));

                  break;
                case "Record":
                  dispatch(deleteDataByIdRecord(item.id));

                  break;
                default:
                  break;
              }
              removeElement(idx1, idx2);
              dispatch(dontClickInputText());
              dispatch(dontClickImage());
              dispatch(dontClickInputUrl());
              dispatch(dontClickRecord());
              dispatch(dontClickVideo());
              dispatch(dontClickAudio());
              switch (item.type) {
                case "Text":
                  dispatch(deleteDataByIdText(item.id));
                  break;
                case "Image":
                  dispatch(deleteDataByIdImage(item.id));

                  break;
                case "Video":
                  dispatch(deleteDataByIdVideo(item.id));

                  break;
                case "Audio":
                  dispatch(deleteDataByIdAudio(item.id));

                  break;
                case "URL":
                  dispatch(deleteDataByIdUrl(item.id));

                  break;
                case "Record":
                  dispatch(deleteDataByIdRecord(item.id));

                  break;
                default:
                  break;
              }
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
                // removeElement(idx1, idx2);
                // dispatch(dontClickInputText());
                // dispatch(dontClickImage());
                // dispatch(dontClickInputUrl());
                // dispatch(dontClickRecord());
                // dispatch(dontClickVideo());
                // dispatch(dontClickAudio());
                switch (item.type) {
                  case "Text":
                    dispatch(deleteDataByIdText(item.id));
                    break;
                  case "Image":
                    dispatch(deleteDataByIdImage(item.id));

                    break;
                  case "Video":
                    dispatch(deleteDataByIdVideo(item.id));

                    break;
                  case "Audio":
                    dispatch(deleteDataByIdAudio(item.id));

                    break;
                  case "URL":
                    dispatch(deleteDataByIdUrl(item.id));

                    break;
                  case "Record":
                    dispatch(deleteDataByIdRecord(item.id));

                    break;
                  default:
                    break;
                }
                removeElement(idx1, idx2);
                dispatch(dontClickInputText());
                dispatch(dontClickImage());
                dispatch(dontClickInputUrl());
                dispatch(dontClickRecord());
                dispatch(dontClickVideo());
                dispatch(dontClickAudio());
                switch (item.type) {
                  case "Text":
                    dispatch(deleteDataByIdText(item.id));
                    break;
                  case "Image":
                    dispatch(deleteDataByIdImage(item.id));

                    break;
                  case "Video":
                    dispatch(deleteDataByIdVideo(item.id));

                    break;
                  case "Audio":
                    dispatch(deleteDataByIdAudio(item.id));

                    break;
                  case "URL":
                    dispatch(deleteDataByIdUrl(item.id));

                    break;
                  case "Record":
                    dispatch(deleteDataByIdRecord(item.id));

                    break;
                  default:
                    break;
                }
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
  const wsRef = useRef();
  const wsCon = document.getElementById("ws-container");
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  const mouseDownHandler = function (e) {
    if (!wsRef.current.contains(e.target)) return;
    pos = {
      // The current scroll
      left: wsCon.scrollLeft,
      top: wsCon.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
    wsCon.addEventListener("mousemove", mouseMoveHandler);
    wsCon.addEventListener("mouseup", mouseUpHandler);
  };
  // if (wsCon) wsCon.addEventListener("mousedown", mouseDownHandler);

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    wsCon.scrollTop = pos.top - dy;
    wsCon.scrollLeft = pos.left - dx;
  };
  const mouseUpHandler = function (e) {
    e.stopPropagation();
    wsCon.removeEventListener("mousemove", mouseMoveHandler);
    wsCon.style.cursor = "grab";
    wsCon.style.removeProperty("user-select");
    wsCon.removeEventListener("mouseup", mouseUpHandler);
  };

  const transformDefault = {
    scale: 1,
    positionX: 0,
    positionY: 0,
  };
  return (
    <>
      <Xwrapper>
        <TransformWrapper
          onTransformed={(ref, state) => {
            props.setTransform(state);
            setScaleValue(state.scale);
          }}
          centerOnInit={true}
          minScale={0.5}
          maxScale={10}
          initialScale={transformDefault.scale}
          centerZoomedOutside={true}
        >
          <TransformComponent
            wrapperStyle={{ width: "100vw", height: "100vh" }}
          >
            <Droppable
              types={["components"]} // <= allowed drop types
              onDrop={onDrop}
              id="droppable"
            >
              <div
                className="w-[10000px] h-[10000px] bg-repeat whitespace"
                id="boxDrop"
                ref={wsRef}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,.6)",
                  }}
                >
                  {renderedElements}
                </div>
              </div>
            </Droppable>
          </TransformComponent>
        </TransformWrapper>
        {paths}
      </Xwrapper>

      {isOpenCustomize && (
        <Customize
          title={DataOpenCustomize.title}
          tools={DataOpenCustomize.tools}
          addElement={props.addElement}
          setDefaultPosition={props.setDefaultPosition}
          transform={props.transform}
          boxSelected={boxSelected}
          updateElement={props.updateElement}
          boxRef={boxRef}
        />
      )}
      {tools && <Tools />}
      {/* {<Xarrow start={boxRef} end={endpoint} />} */}
    </>
  );
}

export default Whitespace;
