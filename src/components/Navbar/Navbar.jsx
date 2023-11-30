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

  const [type, setType] = useState(null);
  const click = useSelector((state) => state.click.value);
  const file = useSelector((state) => state.file.value);

  return (
    <div className="container1">
      <div className="navbar">
        <div
          className="box_1"
          onClick={() => {
            setIsOpenInputText(true);
            addElement("text");
          }}
        >
          <TextT size={32} />
        </div>
        <div
          className="box_1"
          onClick={() => {
            setIsOpenInputImage(true);
            addElement("img");
          }}
        >
          <Image size={32} />
        </div>
        <div
          className="box_1"
          onClick={() => {
            addElement("camera");
            setIsOpenInputVideo(true);
          }}
        >
          <VideoCamera size={32} />
        </div>
        <div
          className="box_1"
          onClick={() => {
            addElement("audioUpload");
            setIsOpenInputAudio(true);
          }}
        >
          <GooglePodcastsLogo size={32} />
        </div>
        <div
          className="box_1"
          onClick={() => {
            addElement("record");
            setIsOpenInputRecor(true);
          }}
        >
          <Microphone size={32} />
        </div>
        <div
          className="box_1"
          onClick={() => {
            addElement("link");
            setIsOpenInputURL(true);
          }}
        >
          <LinkSimple size={32} />
        </div>
        <div className="box_line"></div>

        <div className="box_1">
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
              <ModalOptionTool />
            </Popup>
          ) : (
            <div>
              <ShieldSlash size={32} color="red" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
