import React, { useRef } from "react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { dontClickFile, onClickFile } from "../../redux/fileSlice";

function PopupDragFile({ toggle, accepts, callback }) {
  const dispatch = useDispatch();
  // const [dataFile,setDataFile] = useState("")
  const inputFile = useRef(null);
  const closePopup = (e) => {
    toggle(false);
  };

  const uploadFile = (e) => {
    e.stopPropagation();
    inputFile.current.click();
  };

  const fileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      callback(URL.createObjectURL(event.target.files[0]));
      toggle(false);
    }
    if (event.target.files[0]) {
      dispatch(onClickFile());
    } else {
      dispatch(dontClickFile());
    }
  };

  return (
    <div
      id="overlay"
      className="animate-open-popup w-full h-full bg-white flex items-center justify-center absolute top-0 z-10"
      onClick={closePopup}
    >
      <div
        className="cursor-pointer bg-gray rounded-md w-[80%] h-[70%] flex items-center justify-center opacity-100 text-center"
        onClick={uploadFile}
      >
        <div className="border-dashed rounded-md border-blue w-[100%] h-[100%] border-2 flex flex-col justify-center items-center p-2">
          <CloudArrowUp size={80} className="text-black" />
          <input
            type="file"
            className="hidden"
            id="input-file"
            accept={accepts}
            ref={inputFile}
            onChange={fileChange}
          />
          <p className="text-xs text-black">Drag and drop your file type</p>
          <div className="flex flex-row">
            <p className="text-xs text-black">{accepts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupDragFile;
