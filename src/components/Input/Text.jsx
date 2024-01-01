import React, {
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { TextT, LinkSimple, XCircle } from "@phosphor-icons/react";
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
import { onClickDelete } from "../../redux/clickDeletefile";
import { useBoxContext } from "../Whitespace/Element";

export const TextInput = React.forwardRef(function TextResult(_, ref) {
  // const reduxData = useSelector(state => state.clickText.data);
  // //console.log("check redux data:", reduxData)
  // const [textId, setTextId] = useState(1)
  const { handleBoxChange } = useBoxContext();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const handleClickDelete = () => {
    dispatch(onClickDelete());
  };

  const handleInputBlur1 = () => {
    // dispatch(onClickInputText());
  };
  const selectDataText = useSelector((state) => state.clickSelect.data);
  const selectDataTextId = selectDataText.id;
  function validateText(text) {
    // Trim the input to remove leading and trailing whitespaces
    const trimmedText = text.trim();

    // Check if the trimmed text is not empty
    const isValid = trimmedText.length > 0;

    return isValid;
  }
  const handleChangeInput = (value) => {
    handleBoxChange(value, validateText(value));
    setInputValue(value);
  };

  const validate = (text) => {
    if (text.length === 0) {
      setMessage("Your text can't be empty");
      return;
    }
    setMessage("");
  };
  const textRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        setInput(input) {
          textRef.current.value = input;
          handleBoxChange(input, validateText(input));
          setInputValue(input);
        },
      };
    },
    []
  );
  return (
    <>
      <div className="relative touch-none bg-white w-full h-full max-h-full border-blue border-2 rounded-md inline-flex justify-center items-center p-[11px]  overflow-y-scroll no-scrollbar">
        <TextT size={25} className="text-blue bg-transparent mr-2" />
        <TextareaAutosize
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          value={inputValue}
          ref={textRef}
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
      </div>
      <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleClickDelete}
          onTouchStart={handleClickDelete}>
          <XCircle size={22} color="white" />
        </div>
      </div>
    </>
  );
});

export const URLInput = React.forwardRef(function URLResult(_, ref) {
  const { handleBoxChange } = useBoxContext();
  const selectDataUrl = useSelector((state) => state.clickSelect.data);
  const selectDataUrlId = selectDataUrl.id;
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
    handleBoxChange(value, validateURL(value));
    setLinkValue(value);
    if (value.trim() !== "") {
      // Đã có dữ liệu trong input

      dispatch(setInputValueUrl({ selectDataUrlId, value }));
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
          ref={ref}
          onBlur={handleInputBlur2}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          type="url"
          placeholder="Enter your text ..."
          className="w-full text-black outline-none border-0 border-none focus:ring-0 bg-transparent"
        />
        {/* {mess.length > 0 && <Notify message={mess} />} */}
      </div>
      <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleClickDelete}
          onTouchStart={handleClickDelete}>
          <XCircle size={22} color="white" />
        </div>
      </div>
    </>
  );
});
