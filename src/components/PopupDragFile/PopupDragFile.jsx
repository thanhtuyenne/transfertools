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
      className="w-full h-full bg-black opacity-25 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0"
      onClick={closePopup}
    >
      <div
        id="overlay"
        className="animate-open-popup w-full h-full bg-black opacity-75 flex items-center justify-center absolute top-0 z-10"
        onClick={closePopup}
      >
        <div
          className="cursor-pointer bg-white rounded-md w-[60%] h-[60%] flex items-center justify-center opacity-100"
          onClick={uploadFile}
        >
          <div className="border-dashed rounded-md border-blue w-[60%] h-[60%] border-2 flex flex-col justify-center items-center">
            <CloudArrowUp size={80} className="text-gray" />
            <input
              type="file"
              className="hidden"
              id="input-file"
              accept={accepts}
              ref={inputFile}
              onChange={fileChange}
            />
            <p className="">Drag and drop your file type like</p>
            <div className="flex flex-row">
              <p className="text-sm">{accepts}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupDragFile;
