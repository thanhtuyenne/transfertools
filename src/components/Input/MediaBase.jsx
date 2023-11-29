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
        className="cursor-pointer max-h-[200px] max-w-sm border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]"
        onClick={openPopup}
      >
        <IconComp size={20} className="text-blue mr-2 shrink-0" />
        <div className="outline-none border-0 border-none focus:ring-0 h-full">
          {inputValue != null ? (
            callback(inputValue)
          ) : (
            <span className="text-[#6b7280]">{placeholder}</span>
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
