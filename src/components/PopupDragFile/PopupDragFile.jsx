import React, { useRef, useState } from "react";
import { CloudArrowUp } from '@phosphor-icons/react'
import { useDispatch } from "react-redux";
import { dontClickFile, onClickFile } from "../../redux/fileSlice";


function PopupDragFile({ toggle, accepts }) {
    const dispatch = useDispatch()
    const [fileValue, setFileValue] = useState('');

    const inputFile = useRef(null);
    const closePopup = (e) => {
        toggle(false);
    }

    const uploadFile = (e) => {
        e.stopPropagation()
        inputFile.current.click()
    }

    const handleChangeFile =(value)=>{
        console.log(value)
        if (value) {
            setFileValue(value);
            dispatch(onClickFile())
          }
        else{
            dispatch(dontClickFile())
        }
    }
    return (
        <div id='overlay' className="w-full h-full bg-black opacity-25 flex items-center justify-center absolute top-0"
            onClick={closePopup}>
            <div className="cursor-pointer bg-white rounded-md w-[60%] h-[60%] flex items-center justify-center"
                onClick={uploadFile}>
                <div className="border-dashed rounded-md border-blue w-[60%] h-[60%] border-2 flex flex-col justify-center items-center">
                    <CloudArrowUp size={80} className="text-gray" />
                    <input
                        onChange={(e) =>
                            handleChangeFile(e.target.files[0])
                        }
                        type="file"
                        className="hidden"
                        id="input-file"
                        accept={accepts}
                        ref={inputFile} />
                    <p className="">Drag and drop your file type like</p>
                    <div className="flex flex-row">
                        <p className="text-sm">{accepts}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupDragFile;