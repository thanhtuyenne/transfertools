import { ShieldSlash } from "@phosphor-icons/react";
import {
  GooglePodcastsLogo,
  Hammer,
  Image,
  LinkSimple,
  Microphone,
  TextT,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { useSelector } from "react-redux";
// import { useState } from "react";
import Popup from "reactjs-popup";
import ModalOptionTool from "./ModalOptionTools";
import "./navbar.css";
import { useState } from "react";
import Customize from "../Customize/Customize";
import { Draggable } from "react-drag-and-drop";
import Tools from "../Customize/Tools";

const Navbar = (props) => {
  const {
    addElement,
    setDefaultPosition,
    isOpenInputText,
    isOpenInputURL,
    isOpenInputAudio,
    isOpenInputVideo,
    isOpenInputImage,
    isOpenInputRecor,
    setIsOpenInputText,
    setIsOpenInputURL,
    setIsOpenInputAudio,
    setIsOpenInputVideo,
    setIsOpenInputImage,
    setIsOpenInputRecor,
  } = props;
  const showInfo = (e) => {
    if (e.clientX && e.clientY) {
      setDefaultPosition({
        x: e.clientX - window.innerWidth * 0.13,
        y:
          window.innerHeight -
          e.clientY -
          99.6 +
          (e.target.parentNode.title ? -400 : 60),
      });
    }
  };
  const clickText = useSelector((state) => state.clickText.value);
  const clickImage = useSelector((state) => state.clickImage.value);

  const [type, setType] = useState(null);
  const [title, setTitle] = useState(null);

  const [openTool, setOpenTool] = useState(false);
  const [activeSetting, setActiveSetting] = useState(false);

  const handleOpenTool = () => {
    setOpenTool(false);
    setActiveSetting(false);
  };

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
                className="box_1 hover:bg-[#686de0]"
                // onClick={() => {
                //   setIsOpenInputText(true);
                //   addElement("Text");
                // }}
              >
                <TextT size={32} />
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
                className="box_1 hover:bg-[#f0932b]"
                // onClick={() => {
                //   setIsOpenInputImage(true);
                //   addElement("Image");
                // }}
              >
                <Image size={32} />
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
                className="box_1 hover:bg-[#6ab04c]"
                // onClick={() => {
                //   addElement("Video");
                //   setIsOpenInputVideo(true);
                // }}
              >
                <VideoCamera size={32} />
              </div>
            </abbr>
          </Draggable>
          <Draggable
            className=" cursor-pointer"
            type="components"
            data="Audio"
            onDrag={() => handleOpenTool()}
          >
            <abbr title="Audio">
              <div
                className="box_1 hover:bg-[#f9ca24]"
                // onClick={() => {
                //   addElement("Audio");
                //   setIsOpenInputAudio(true);
                // }}
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
                className="box_1 hover:bg-[#95afc0]"
                // onClick={() => {
                //   addElement("Record");
                //   setIsOpenInputRecor(true);
                // }}
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
                className="box_1 hover:bg-[#e66767]"
                // onClick={() => {
                //   addElement("URL");
                //   setIsOpenInputURL(true);
                // }}
              >
                <LinkSimple size={32} />
              </div>
            </abbr>
          </Draggable>
          {/* <div className="box_line"></div> */}

          {/* <div className="box_1">
            {(isOpenInputText && click) ||
              (isOpenInputURL && click) ||
              (isOpenInputAudio && file) ||
              (isOpenInputVideo && file) ||
              (isOpenInputImage && file) ||
              (isOpenInputRecor && file) ? (
              <Popup
                trigger={
                  <button>
                    <Hammer size={32} />
                  </button>
                }
                position="top center"
                offsetY={25}
                // disabled={true}
                arrowStyle={{
                  color: "rgba(0, 0, 0, 0.15)",
                  width: "30px",
                  bottom: 0,
                  right: "-10px",
                  // border: "1px solid #CCCCCC"
                }}
              >
                <ModalOptionTool types={setType} titles={setTitle} />
              </Popup>
            ) : (
              <div>
                {
                  <ShieldSlash size={32} color="red" />
                }
              </div>
            )}
          </div> */}
          <abbr title="Tools">
            <div
              className={`box_1 hover:bg-[#7ed6df] ${
                activeSetting ? "active-setting" : ""
              }`}
              id="setting"
              onClick={() => {
                setOpenTool(!openTool);
                setActiveSetting(!activeSetting);
              }}
            >
              <Hammer size={32} />
            </div>
          </abbr>
          {/* <Popup
              trigger={
                <button>
                  <Hammer size={32} />
                </button>
              }
              position="top center"
              offsetY={25}
              // disabled={true}
              // arrowStyle={{
              //   color: "rgba(0, 0, 0, 0.15)",
              //   width: "30px",
              //   bottom: 0,
              //   right: "-10px",
              //   // border: "1px solid #CCCCCC"
              // }}
            >
              <ModalOptionTool types={setType} titles={setTitle} />
            </Popup> */}
        </div>
      </div>
      {/* {type === "ToVoice" && (
        <Customize
          // toVoice={true}
          title={title}
        />
      )}
      {type === "ToText" && <Customize title={title} />} */}
      {openTool && <Tools />}
    </>
  );
};

export default Navbar;
