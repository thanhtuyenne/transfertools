import React, { useState, useRef } from "react";
import PopupDragFile from "../PopupDragFile/PopupDragFile";
import { Eraser, Trash, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { useEffect } from "react";
import ContextMenu from "./ContextMenu";
import { Popup } from "reactjs-popup";
import InputOption from "../Navbar/InputOption";
import { useDispatch } from "react-redux";
import { onClickImage } from "../../redux/clickImageSlice";

function MediaBase({ IconComp, placeholder, accept, callback }) {
  const [popup, setShowPopup] = useState(false);
  const [media, setMedia] = useState(<></>);
  const openPopup = () => {
    setShowPopup(true);
  };
  const handleSetFile = (file) => {
    setFile(file);
    setMedia(callback(file));
  };
  const [file, setFile] = useState(null);
  const [rightClick, setRightClick] = useState(false);
  // console.log(file)

  let removeRef = useRef();
  const mediaRef = useRef();
  const handleRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setRightClick(true);
  };

  const removeInput = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // if (removeRef.current.contains(e.target)) {
    //   console.log("remove");
    // }
    setFile(null);
    setRightClick(false);
  };

  const closeContext = () => {
    setRightClick(false);
  };
  // document.addEventListener("mousedown", closeContext);
  const [inputOption, setInputOption] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer w-full h-full bg-white border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]"
        onDoubleClick={openPopup}
        ref={mediaRef}
      >
        <IconComp size={25} className="text-blue mr-2 shrink-0 flex-0" />
        <div
          className="relative outline-none border-0 border-none focus:ring-0 h-full flex items-center justify-center flex-1"
          onContextMenu={(e) => handleRightClick(e)}
        >
          {file != null ? (
            <>
              {media}
              {rightClick && (
                <>
                  <div
                    ref={removeRef}
                    onClick={(e) => removeInput(e)}
                    className="rounded-md items-center justify-around w-[150px] border-black bg-red-600 h-[40px] absolute bottom-0 right-0 flex transition-[0.25s] animate-blur-option"
                  >
                    <Eraser size={18} color="white" className="" />
                    <span>Remove file</span>
                  </div>
                  <ContextMenu
                    contextMenuRef={removeRef}
                    containerRef={mediaRef}
                    callback={closeContext}
                  ></ContextMenu>
                </>
              )}
            </>
          ) : (
            <span className="text-black w-full text-center">{placeholder}</span>
          )}
        </div>
        <Popup
          trigger={
            <DotsThreeOutlineVertical
              size={32}
              className="lg:hidden text-blue"
              onClick={(e) => {
                setInputOption(!inputOption);
                e.stopPropagation();
              }}
            />
          }
        >
          <InputOption />
        </Popup>
      </div>
      {popup && file == null && (
        <div className="fixed top-0 left-0 w-full h-full">
          <PopupDragFile
            toggle={setShowPopup}
            accepts={accept}
            callback={handleSetFile}
          />
        </div>
      )}
    </>
  );
}

export default MediaBase;
