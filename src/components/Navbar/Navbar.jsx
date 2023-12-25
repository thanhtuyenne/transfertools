import {
  GooglePodcastsLogo,
  Hammer,
  Image,
  LinkSimple,
  Microphone,
  TextT,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { useEffect, useState } from "react";
import { Draggable } from "react-drag-and-drop";
import Tools from "../Customize/Tools";
import Popup from "reactjs-popup";
import {
  DotsThreeOutline
} from "@phosphor-icons/react";
import MobileOption from "./MobileOption";
import { IsActiveTools, NotActiveTools } from "../../redux/activeToolsSlice";
import {
  NotActiveCustomize,
} from "../../redux/activeCustomizeSlice";

const Navbar = (props) => {
  const { setDefaultPosition, addElement, transform } = props;
  const defaultValue = useSelector((state) => state.globalDefaultValue.value);
  const boxSize = {
    width: defaultValue.defaultBoxSize.width,
    height: defaultValue.defaultBoxSize.height,
  };
  // const wsContainer = document.getElementById("ws-container");
  const showInfo = (e) => {
    e.stopPropagation();
    const wsContainer = document.getElementById("ws-container");

    if (e.clientX && e.clientY) {
      const workspace = document.querySelector(".whitespace");
      let rect;
      if (workspace) {
        rect = workspace.getBoundingClientRect();
      }

      const dirX =
        (e.clientX - transform.positionX) / transform.scale - boxSize.width / 2;
      const dirY =
        (rect.height - e.clientY + transform.positionY) / transform.scale -
        boxSize.height / 2;
      // ( + e.clientY - transform.positionY) * transform.scale;
      setDefaultPosition({
        x: dirX,
        y: dirY,
      });
    }
  };
  // const clickText = useSelector((state) => state.clickText.value);
  // const clickImage = useSelector((state) => state.clickImage.value);

  // const [type, setType] = useState(null);
  // const [title, setTitle] = useState(null);
  const [screen, setScreen] = useState(window.innerWidth <= 768);
  // const [openTool, setOpenTool] = useState(false);
  const [activeSetting, setActiveSetting] = useState(false);
  const dispatch = useDispatch();
  const tools = useSelector((state) => state.tools.value);

  const handleOpenTool = (e) => {
    // e.stopPropagation();
    // setOpenTool(false);
    dispatch(NotActiveTools());
    setActiveSetting(false);
  };

  const setCenterDefaultrPositionBox = () => {
    const wsContainer = document.getElementById("ws-container");
    const workspace = document.querySelector(".whitespace");
    let rect;
    if (workspace) {
      rect = workspace.getBoundingClientRect();
    }
    setDefaultPosition({
      x:
        (window.innerWidth / 2 - transform.positionX )/ transform.scale- boxSize.width / 2 ,
      y:
        (rect.height  -
          window.innerHeight / 2  + transform.positionY) / transform.scale -
          boxSize.height / 2 +
        Math.floor(Math.random() * (80 - 40 + 1)) +
        40,
    });
  };
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth <= defaultValue.tabletScreenSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [popupMobile, setPopupMobile] = useState(false);

  return (
    <>
      <div className="container1">
        <div className="navbar" onDrag={showInfo}>
          <Draggable
            className=" cursor-pointer"
            type="components"
            data="Text"
            onDrag={() => handleOpenTool()}
          >
            <abbr title="Text">
              <div
                className="box_1 lg:hover:bg-[#686de0] md:hover:bg-[#686de0] flex flex-col font-bold text-white md:text-black"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setCenterDefaultrPositionBox();
                }}
                onMouseUp={(e) => {
                  e.stopPropagation();
                  addElement("Text");
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  addElement("Text");
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setCenterDefaultrPositionBox();
                }}
              >
                <TextT size={32} />
                <span className="lg:hidden md:hidden">TEXT</span>
              </div>
            </abbr>
          </Draggable>
          <Draggable
            className=" cursor-pointer"
            type="components"
            data="Image"
            onDrag={() => handleOpenTool()}
          >
            <abbr title="Image">
              <div
                className="box_1 lg:hover:bg-[#f0932b] md:hover:bg-[#f0932b] flex flex-col font-bold text-white md:text-black"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setCenterDefaultrPositionBox();
                }}
                onMouseUp={(e) => {
                  e.stopPropagation();
                  addElement("Image");
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  addElement("Image");
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setCenterDefaultrPositionBox();
                }}
              >
                <Image size={32} />
                <span className="lg:hidden md:hidden">IMAGE</span>
              </div>
            </abbr>
          </Draggable>
          <Draggable
            className=" cursor-pointer"
            type="components"
            data="Video"
            onDrag={() => handleOpenTool()}
          >
            <abbr title="Video">
              <div
                className="box_1 lg:hover:bg-[#6ab04c] md:hover:bg-[#6ab04c] flex flex-col font-bold text-white md:text-black"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setCenterDefaultrPositionBox();
                }}
                onMouseUp={(e) => {
                  e.stopPropagation();
                  addElement("Video");
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  addElement("Video");
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setCenterDefaultrPositionBox();
                }}
              >
                <VideoCamera size={32} />
                <span className="lg:hidden md:hidden">VIDEO</span>
              </div>
            </abbr>
          </Draggable>
          {screen ? (
            <>
              <div
                className="flex flex-col lg:hidden md:hidden items-center relative"
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setPopupMobile(!popupMobile);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setPopupMobile(!popupMobile);
                }}
              >
                <button className="relative mobileOption">
                  <DotsThreeOutline size={32} color="white" />
                </button>
                <span className="font-bold text-white">MORE</span>
              </div>
              {popupMobile && (
                <MobileOption
                  addElement={addElement}
                  setCenterDefaultPosition={setCenterDefaultrPositionBox}
                />
              )}
            </>
          ) : (
            // <Popup
            //   trigger={
            //     <div className="flex flex-col lg:hidden md:hidden items-center" >
            //       <button className="relative mobileOption">
            //         <DotsThreeOutline size={32} color="white" />
            //       </button>
            //       <span className="font-bold text-white">MORE</span>
            //     </div>
            //   }
            //   arrow={false}
            // >
            //   {/* <ModalOptionTool types={setType} titles={setTitle} /> */}
            //   <MobileOption
            //     addElement={addElement}
            //     setCenterDefaultPosition={setCenterDefaultrPositionBox}
            //   />
            // </Popup>
            <>
              <Draggable
                className=" cursor-pointer"
                type="components"
                data="Audio"
                onDrag={() => handleOpenTool()}
              >
                <abbr title="Audio">
                  <div
                    className="md:flex lg:flex box_1 hover:bg-[#f9ca24]"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setCenterDefaultrPositionBox();
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      addElement("Audio");
                    }}
                  >
                    <GooglePodcastsLogo size={32} />
                  </div>
                </abbr>
              </Draggable>
              <Draggable
                className=" cursor-pointer"
                type="components"
                data="Record"
                onDrag={() => handleOpenTool()}
              >
                <abbr title="Record">
                  <div
                    className="md:flex lg:flex box_1 hover:bg-[#95afc0]"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setCenterDefaultrPositionBox();
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      addElement("Record");
                    }}
                  >
                    <Microphone size={32} />
                  </div>
                </abbr>
              </Draggable>
              <Draggable
                className=" cursor-pointer"
                type="components"
                data="URL"
                onDrag={() => handleOpenTool()}
              >
                <abbr title="URL">
                  <div
                    className="md:flex lg:flex box_1 hover:bg-[#e66767]"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setCenterDefaultrPositionBox();
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      addElement("URL");
                    }}
                  >
                    <LinkSimple size={32} />
                  </div>
                </abbr>
              </Draggable>
              <abbr title="Tools">
                <div
                  className={`md:flex lg:flex box_1 hover:bg-[#7ed6df] z-[10] ${
                    tools ? "active-setting" : ""
                  }`}
                  id="setting"
                  onClick={() => {
                    tools
                      ? dispatch(NotActiveTools())
                      : dispatch(IsActiveTools());
                    setActiveSetting(!tools);
                    dispatch(NotActiveCustomize());
                  }}
                >
                  <Hammer size={32} />
                </div>
              </abbr>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
