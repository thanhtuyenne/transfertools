import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  TextT,
  LinkSimple,
  Microphone,
} from "@phosphor-icons/react";
import Notify from "../Notify/Notify";
import { useDispatch } from 'react-redux'
import { dontClickInput, onClickInput } from "../../redux/clickSlice";


// export const Noti = (message) => {
//   return (
//     <span>
//       <WarningCircle
//         size={15}
//         className="text-white bg-red-600 rounded-full absolute bottom-2 right-2"
//       />
//       <span className="absolute top-0 bg-red-300 border-black border-1 bottom-2 ">
//         <nav>{message}</nav>
//       </span>
//     </span>
//   );
// };
export const TextInput = () => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('');

    const handleChangeInput = (value) => {
        setInputValue(value);
        if (value.trim() !== '') {
            // Đã có dữ liệu trong input
            dispatch(onClickInput())
        } else {
            // Không có dữ liệu trong input
            dispatch(dontClickInput())

        }
    };

    return (

        <div div className="h-[40px] border-blue border-2 rounded-md inline-flex justify-center items-center overflow-hidden p-[11px]" >
            <TextT size={20} className='text-blue bg-transparent' />
            <input
                value={inputValue}
                onChange={(e) =>
                    handleChangeInput(e.target.value)
                }
                type="text"
                placeholder="Enter your text ..."
                className="outline-none border-0 border-none focus:ring-0 bg-transparent " />
        </div >
    )
}

export const URLInput = () => {
    const [linkValue, setLinkValue] = useState('');
    const dispatch = useDispatch()
    const handleChangeLink = (value) => {
        setLinkValue(value);
        if (value.trim() !== '') {
            // Đã có dữ liệu trong input
            dispatch(onClickInput())
        } else {
            // Không có dữ liệu trong input
            dispatch(dontClickInput())

        }
    };

    return (
        <div className="h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
            <LinkSimple size={20} className='text-blue' />
            <input
                value={linkValue}
                onChange={(e) =>
                    handleChangeLink(e.target.value)
                }
                type="url"
                placeholder="Enter your text ..."
                className="outline-none border-0 border-none focus:ring-0 bg-transparent " />
        </div>
    )
}

export const Record = () => {
  return (
    <div className="h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
      <Microphone size={20} className="text-blue" />
      <input
        type=""
        className="outline-none border-0 border-none focus:ring-0 bg-transparent "
      />
    </div>
  );
};

// export default Text;
