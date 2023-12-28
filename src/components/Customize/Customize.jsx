import React, { useEffect, useState, useCallback, useRef } from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import "./Customize.css";
import {
  Swap,
  XCircle,
} from "@phosphor-icons/react";
import { dontClickInputText } from "../../redux/clickTextSlice";
import { dontClickInputUrl } from "../../redux/clickURLSlice";
import { dontClickImage } from "../../redux/clickImageSlice";
import { dontClickVideo } from "../../redux/clickVideoSlice";
import { dontClickRecord } from "../../redux/clickRecordSlice";
import { dontClickAudio } from "../../redux/clickAudioSlice";
import { Draggable } from "react-drag-and-drop";

function Customize({ title, tools = [], isOpen }) {
  const [indexTool, setIndexTool] = useState(0);
  const [currentTool, setCurrentTool] = useState(tools[indexTool].comp);
  const [preview, setPreview] = useState(tools[indexTool].preview);
  const [clicked, setClick] = useState(false);
  const parentRef = useRef();
  const [screen, setScreen] = useState(window.innerWidth >= 768);
  const dispatch = useDispatch();


  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [img, setImg] = useState('')
  const [video, setVideo] = useState('')
  const [audio, setAudio] = useState('')
  const [record, setRecord] = useState('')

  const displayToolSelected = useCallback(
    (toolIndex = 0) => {
      setClick(false);
      setIndexTool(toolIndex);
      setCurrentTool(tools[toolIndex].comp);
      setPreview(tools[toolIndex].preview);
    },
    [tools]
  );
  useEffect(() => {
    setIndexTool(0);
    displayToolSelected(0);
  }, [displayToolSelected, tools]);

  // Dữ liệu gồm id, type của mỗi input được kéo lên screen
  const idType = useSelector(state => state.clickIdType.data)
  // console.log("check idtype:",idType )

  // Thao tác nhấn nút transfer
  const transfer = useSelector((state) => state.typeModel.value);

  // Dữ liệu inputText Chưa sử lý
  const inputText = useSelector((state) => state.clickText.value);
  const dataInputText = useSelector((state) => state.clickText.data);
  // console.log("check data:", dataInputText)
  // Dữ liệu inputUrl Chưa sử lý
  const inputUrl = useSelector((state) => state.clickUrl.value);
  const dataInputUrl = useSelector((state) => state.clickUrl.data);
  // console.log("check data url:", dataInputUrl)


  // Dữ liệu Video Chưa sử lý
  const inputVideo = useSelector((state) => state.clickVideo.value);
  const dataInputVideo = useSelector((state) => state.clickVideo.data);
  // console.log("check video: ", dataInputVideo)

  // Dữ liệu Audio Chưa sử lý
  const inputAudio = useSelector((state) => state.clickAudio.value);
  const dataInputAudio = useSelector((state) => state.clickAudio.data);

  // Dữ liệu Record Chưa sử lý
  const inputRecord = useSelector((state) => state.clickRecord.value);
  const dataInputRecord = useSelector((state) => state.clickRecord.data);

  // Dữ liệu Image Chưa sử lý
  const inputImage = useSelector((state) => state.clickImage.value);
  const dataInputImage = useSelector((state) => state.clickImage.data);
  // console.log("check image:", dataInputImage)
  // DỮ liệu select 
  const selectData = useSelector((state) => state.clickSelect.data)
  // console.log("check id select:", selectData)



  // Thao tác lọc dữ liệu
  const handleData = () => {
    let dataText, dataImage, dataVideo, dataAudio, dataUrl, dataRecord;
    switch (selectData.type) {
      case "Text":
        dataText = dataInputText.find((item, index) =>
          selectData.id === item.id,
        )
        setText(dataText)

        if (typeof dataText === 'undefined') {
          dispatch(dontClickInputText())

        }
        break;

      case "Image":
        dataImage = dataInputImage.find((item, index) => selectData.id === item.id
        )
        setImg(dataImage)

        if (dataInputImage.length === 0) {
          dispatch(dontClickImage())
        }


        break;

      case "Video":
        dataVideo = dataInputVideo.find((item, index) => selectData.id === item.id
        )
        if (dataInputVideo.length === 0) {
          dispatch(dontClickVideo())
        }
        setVideo(dataVideo)

        break;

      case "Audio":
        dataAudio = dataInputAudio.find((item, index) => selectData.id === item.id
        )
        if (dataInputAudio.length === 0) {
          dispatch(dontClickAudio())
        }
        setAudio(dataAudio)

        break;

      case "URL":
        dataUrl = dataInputUrl.find((item, index) => selectData.id === item.id
        )
        setUrl(dataUrl)
        if (dataInputUrl.length === 0) {
          dispatch(dontClickInputUrl())

        }

        break;

      case "Record":
        dataRecord = dataInputRecord.find((item, index) => selectData.id === item.id
        )
        setRecord(dataRecord)
        if (dataInputRecord.length === 0) {
          dispatch(dontClickRecord())

        }

        break;
      default:
        break;
    }
  };
  useEffect(() => {
    handleData();
  }, [
    idType,
    dataInputText,
    dataInputImage,
    dataInputVideo,
    dataInputAudio,
    dataInputUrl,
    dataInputRecord,
  ]);


  // Phần call API
  const handleTransfer = () => {
    if (clicked === true) {
      switch (selectData.type) {
        case "Text":
          console.log("Data Text:", text);

          break;

        case "Image":
          console.log("Data Image:", img);

          break;
        case "Video":
          console.log("Data Video:", video);

          break;

        case "Audio":
          console.log("Data Audio:", audio);

          break;

        case "URL":
          console.log("Data URL:", url);
          break;

        case "Record":
          console.log("Data Record:", record);

          break;
        default:
          break;
      }
    }
  }
  useEffect(() => {
    handleTransfer()
  }, [clicked])


  const handleClosePopup = () => {
    setScreen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customize = useSelector((state) => state.customize.value);

  return (
    <>
      {screen ? (
        <div
          className="fixed left-0 top-0 z-[100] md:w-0 md:h-0 lg:w-0 lg:h-0 animation-[open-popup] transition-[0.25s] overlay_customzie bg-overlay md:bg-transparent lg:bg-transparent w-full h-full"
          ref={parentRef}
        >
          <Draggable onDrag={(e) => e.stopPropagation()} disabled={!customize}>
            <div className="z-100 max-h-[65%] w-[350px] container_customize scrollar-cus lg:min-h-[350px] md:min-h-[350px] overflow-auto bg-white md:w-[350px] lg:w-[350px] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed lg:top-[20%] md:top-[20%] md:right-0 lg:right-0">
              <div className="bpx-2 w-full">
                <div className="flex items-center justify-between text-lg font-bold pt-2 w-full border-b-2 mb-2 pb-3">
                  {title}
                  {screen && (
                    <XCircle
                      size={28}
                      className="lg:hidden md:hidden cursor-pointer font-bold"
                      onClick={() => handleClosePopup()}
                      onTouchStart={() => handleClosePopup()}
                    />
                  )}
                </div>
                <Dropdownlist
                  title="Tools"
                  options={tools.map((v) => {
                    return v.title;
                  })}
                  callback={displayToolSelected}
                  selected={indexTool}
                />
                {currentTool}
              </div>
              <div className="flex justify-end my-2">
                {(transfer === "Text" && inputText === true) ||
                  (transfer === "Image" && inputImage === true) ||
                  (transfer === "Video" && inputVideo === true) ||
                  (transfer === "Audio" && inputAudio === true) ||
                  (transfer === "Record" && inputRecord === true) ||
                  (transfer === "URL" && inputUrl === true) ? (
                  <Button
                    title="Transfer"
                    onClick={() => {
                      setClick(true);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
              {/* PREVIEW */}
              {clicked && preview}
            </div>
          </Draggable>
        </div>
      ) : (
        <Draggable>
          <div
            className="z-[100] md:hidden lg:hidden fixed top-[50%] right-0 bg-white border-[#3498DB] border p-3 flex items-center justify-center rounded-full"
            onClick={() => setScreen(true)}
            onTouchStart={() => setScreen(true)}
          >
            <Swap size={32} className="" color="#3498DB" />
          </div>
        </Draggable>
      )}
    </>
  );
}
export default Customize;
