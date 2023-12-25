import React, { useRef, useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  TextT,
  LinkSimple,
  Microphone,
  DotsThreeOutlineVertical,
  Trash,
  XCircle,
} from "@phosphor-icons/react";
import Notify from "../Notify/Notify";
import { useDispatch, useSelector } from "react-redux";
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
import { onClickDelete } from "../../redux/clickDeletefile";

export const TextInput = () => {
  // const reduxData = useSelector(state => state.clickText.data);
  // console.log("check redux data:", reduxData)
  // const [textId, setTextId] = useState(1)
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const handleClickDelete = () => {
    dispatch(onClickDelete());
  };
  // const handleInputChange1 = (event) => {
  //   const inputValue = event.target.value;
  //   dispatch(setInputValueText(inputValue));
  // };

  const handleInputBlur1 = () => {
    dispatch(onClickInputText());
  };

  // const reduxData = useSelector(state => state.clickText.data);
  const selectDataText = useSelector((state) => state.clickSelect.data)
  const selectDataTextId =  selectDataText.id

  const handleChangeInput = (value) => {
    if (value.trim() !== "") {
      dispatch(setInputValueText({selectDataTextId,value}));
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

  return (
    <>
      <div className="relative touch-none bg-white w-full h-full max-h-full border-blue border-2 rounded-md inline-flex justify-center items-center p-[11px]  overflow-y-scroll no-scrollbar">
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
        {/* {message.length > 0 && <Notify message={message} />} */}
      </div>
      <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleClickDelete}
          onTouchStart={handleClickDelete}
        >
          <XCircle size={22} color="white" />
        </div>
      </div>
    </>
  );
};

export const URLInput = () => {
  const selectDataUrl = useSelector((state) => state.clickSelect.data)
  const selectDataUrlId =  selectDataUrl.id
  const [linkValue, setLinkValue] = useState("");
  const [mess, setMess] = useState("");
  const dispatch = useDispatch();
  const handleClickDelete = () => {
    dispatch(onClickDelete());
  };
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

      dispatch(setInputValueUrl({selectDataUrlId,value}));
    } else {
      // Không có dữ liệu trong input
      dispatch(dontClickInputUrl());
    }
  };

  return (
    <>
      <div className="touch-none h-full w-full bg-white relative border-blue border-2 rounded-md inline-flex items-center p-[11px]">
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
        {/* {mess.length > 0 && <Notify message={mess} />} */}
      </div>
      <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleClickDelete}
          onTouchStart={handleClickDelete}
        >
          <XCircle size={22} color="white" />
        </div>
      </div>
    </>
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
