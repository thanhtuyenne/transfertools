import React, { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  TextT,
  LinkSimple,
  Microphone,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react";
import Notify from "../Notify/Notify";
import { useDispatch } from "react-redux";
import {
  setInputValueText,
  dontClickInputText,
  onClickInputText,
} from "../../redux/clickTextSlice";
import {
  dontClickInputUrl,
  onClickInputUrl,
  setInputValueUrl,
} from "../../redux/clickURLSlice";
import InputOption from "../Navbar/InputOption";
import Popup from "reactjs-popup";

export const TextInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  // const handleInputChange1 = (event) => {
  //   const inputValue = event.target.value;
  //   dispatch(setInputValueText(inputValue));
  // };

  const handleInputBlur1 = () => {
    dispatch(onClickInputText());
  };

  const handleChangeInput = (value) => {
    setInputValue(value);
    if (value.trim() !== "") {
      // Đã có dữ liệu trong input
      dispatch(setInputValueText(value));
    } else {
      // Không có dữ liệu trong input
      dispatch(dontClickInputText());
    }
  };
  const validate = (text) => {
    if (text.length === 0) {
      setMessage("Your text can't be empty");
      return;
    }
    setMessage("");
  };

  return (
    <div className="touch-none bg-white w-full h-full max-h-full border-blue border-2 rounded-md inline-flex justify-center items-center p-[11px]  overflow-y-scroll no-scrollbar">
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
      <Popup
        trigger={
          <DotsThreeOutlineVertical
            size={32}
            className="text-blue cursor-pointer"
          />
        }
      >
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
    <div className="touch-none h-full w-full bg-white relative border-blue border-2 rounded-md inline-flex items-center p-[11px]">
      <LinkSimple size={25} className="text-blue" />
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
      <Popup
        trigger={<DotsThreeOutlineVertical size={32} className="text-blue" />}
      >
        <InputOption />
      </Popup>
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
