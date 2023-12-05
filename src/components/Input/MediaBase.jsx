import React, { useState, useRef } from "react";
import PopupDragFile from "../PopupDragFile/PopupDragFile";

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
  return (
    <>
      <div
        className="cursor-pointer w-full h-full bg-white border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]"
        onDoubleClick={openPopup}
      >
        <IconComp size={25} className="text-blue mr-2 shrink-0 flex-0" />
        <div className="outline-none border-0 border-none focus:ring-0 h-full flex items-center justify-center flex-1">
          {file != null ? (
            media
          ) : (
            <span className="text-black w-full text-center">{placeholder}</span>
          )}
        </div>
      </div>
      {popup && (
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
