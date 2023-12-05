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
const Navbar = (props) => {
  const {
    addElement,
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
  const clickText = useSelector((state) => state.clickText.value);
  const clickImage = useSelector((state) => state.clickImage.value);

  const [type, setType] = useState(null);
  const [title, setTitle] = useState(null);

  return (
    <>
      <div className="container1">
        <div className="navbar">
          <div
            className="box_1"
            onClick={() => {
              setIsOpenInputText(true);
              addElement("Text");
            }}
          >
            <TextT size={32} />
          </div>
          <div
            className="box_1"
            onClick={() => {
              setIsOpenInputImage(true);
              addElement("image");
            }}
          >
            <Image size={32} />
          </div>
          <div
            className="box_1"
            onClick={() => {
              addElement("Video");
              setIsOpenInputVideo(true);
            }}
          >
            <VideoCamera size={32} />
          </div>
          <div
            className="box_1"
            onClick={() => {
              addElement("Audio");
              setIsOpenInputAudio(true);
            }}
          >
            <GooglePodcastsLogo size={32} />
          </div>
          <div
            className="box_1"
            onClick={() => {
              addElement("Record");
              setIsOpenInputRecor(true);
            }}
          >
            <Microphone size={32} />
          </div>
          <div
            className="box_1"
            onClick={() => {
              addElement("url");
              setIsOpenInputURL(true);
            }}
          >
            <LinkSimple size={32} />
          </div>
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
        </div>
      </div>
      {type === "ToVoice" && <Customize
        // toVoice={true}
        title={title}

      />}
      {type === "ToText" && <Customize
        title={title}
      />}
    </>
  );
};

export default Navbar;
