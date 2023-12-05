import React, { useState } from "react";
import PopupDragFile from "../PopupDragFile/PopupDragFile";

function MediaBase({ IconComp, placeholder, accept, callback }) {
  const [popup, setShowPopup] = useState(false);
  const [inputValue, setInput] = useState(null);
  const openPopup = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div
        className="cursor-pointer w-full h-full bg-white border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]"
        onDoubleClick={openPopup}
      >
        <IconComp size={25} className="text-blue mr-2 shrink-0 flex-0" />
        <div className="outline-none border-0 border-none focus:ring-0 h-full flex items-center justify-center flex-1">
          {inputValue != null ? (
            callback(inputValue)
          ) : (
            <span className="text-black w-full text-center">{placeholder}</span>
          )}
        </div>
      </div>
      {popup && (
        <PopupDragFile
          toggle={setShowPopup}
          accepts={accept}
          callback={setInput}
        />
      )}
    </>
  );
}

export default MediaBase;
