import React, { useRef, useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  TextT,
  LinkSimple,
  Microphone,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react";
import Notify from "../Notify/Notify";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputValueText,
  dontClickInputText,
  onClickInputText,
} from "../../redux/clickTextSlice";
import { dontClickInputUrl, onClickInputUrl, setInputValueUrl } from "../../redux/clickURLSlice";
import InputOption from "../Navbar/InputOption";
import Popup from "reactjs-popup";

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
  // const reduxData = useSelector(state => state.clickText.data);
  // console.log("check redux data:", reduxData)
  // const [textId, setTextId] = useState(1)
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  console.log("check du lieu:", inputValue)



  // useEffect(() => {
  //   const inputData = reduxData.find(item => item.value === inputValue);
  //   if (inputData) {
  //     setInputValue(inputData.value);
  //   } else {
  //     setInputValue('');
  //   }
  // }, [reduxData]);

  const handleInputBlur1 = () => {
    dispatch(onClickInputText());
  };

  // const reduxData = useSelector(state => state.clickText.data);

  const handleChangeInput = (value) => {
    if (value.trim() !== "") {
      dispatch(setInputValueText(value));
      
    } else {
      // Không có dữ liệu trong input
      dispatch(dontClickInputText());
    }
    setInputValue(value)
  };
  const validate = (text) => {
    if (text.length === 0) {
      setMessage("Your text can't be empty");
      return;
    }
    setMessage("");
  };

  const [inputOption, setInputOption] = useState(false);

  return (
    <div className="bg-white w-full h-full max-h-full border-blue border-2 rounded-md inline-flex justify-center items-center p-[11px]  overflow-y-scroll no-scrollbar">
      <TextT size={25} className="text-blue bg-transparent mr-2" />
      <TextareaAutosize
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        value={inputValue}
        onChange={(e) => {
          validate(e.target.value);
          handleChangeInput(e.target.value);
        }}
        onBlur={handleInputBlur1}
        className="h-full resize-none text-black outline-none border-0 border-none focus:ring-0 bg-transparent flex-grow p-0 mr-5 overflow-y-scroll no-scrollbar"
        placeholder="Enter your text ..."
        minRows={1}
        maxRows={10}
      />
      <Popup trigger={
        <DotsThreeOutlineVertical
          size={32}
          className="lg:hidden text-blue"
          onClick={(e) => { setInputOption(!inputOption); e.stopPropagation(); }}

        />
      }>
        <InputOption />
      </Popup>
      {message.length > 0 && <Notify message={message} />}
    </div>
  );
};

export const URLInput = () => {
  const [linkValue, setLinkValue] = useState("");
  const [mess, setMess] = useState("");
  const dispatch = useDispatch();
  // xử lý lỗi
  const regexURL =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const validateURL = (url) => {
    if (!url.match(regexURL)) {
      setMess("Your URL is not valid");
      return;
    }
    setMess("");
  };

  const handleInputBlur2 = () => {
    dispatch(onClickInputUrl());
  };
  // lưu trạng thái
  const handleChangeLink = (value) => {
    setLinkValue(value);
    if (value.trim() !== "") {
      // Đã có dữ liệu trong input

      dispatch(setInputValueUrl(value));
    } else {
      // Không có dữ liệu trong input
      dispatch(dontClickInputUrl());
    }
  };

  return (
    <div className="h-full w-full bg-white relative border-blue border-2 rounded-md inline-flex items-center p-[11px]">
      <LinkSimple size={20} className="text-blue" />
      <input
        value={linkValue}
        onChange={(e) => {
          validateURL(e.target.value);
          handleChangeLink(e.target.value);
        }}
        onBlur={handleInputBlur2}

        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        type="url"
        placeholder="Enter your text ..."
        className="w-full text-black outline-none border-0 border-none focus:ring-0 bg-transparent  "
      />
      {mess.length > 0 && <Notify message={mess} />}
    </div>
  );
};

// export const Record = () => {
//     return (
//         <div className="h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
//             <Microphone size={20} className="text-blue" />
//             <input
//                 type=""
//                 className="outline-none border-0 border-none focus:ring-0 bg-transparent "
//             />
//         </div>
//     );
// };

// export default Text;
