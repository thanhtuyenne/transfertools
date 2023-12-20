import React, { useEffect, useState, useCallback, useRef } from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import "./Customize.css";
import { Minus, Swap } from "@phosphor-icons/react";
import Draggable from "react-draggable";

function Customize({ title, tools = [] }) {
  const [dataSample, setDataSample] = useState([]);
  // const [toolsSelected, setToolsSelected] = useState(0);
  // const handleToolSelected = (value) => {
  //   setToolsSelected(value);
  // };

  const importData = (id, type, value) => {
    const newDataSample = [...dataSample, { id: id, type: type, value: value }];
    setDataSample(newDataSample);
  };

  const [indexTool, setIndexTool] = useState(0);
  const [currentTool, setCurrentTool] = useState(tools[indexTool].comp);
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
  const idType = useSelector((state) => state.clickIdType.data);

  // Thao tác nhấn nút transfer
  const transfer = useSelector((state) => state.typeModel.value);

  // Dữ liệu inputText Chưa sử lý
  const inputText = useSelector((state) => state.clickText.value);
  const dataInputText = useSelector((state) => state.clickText.data);

  // Dữ liệu inputUrl Chưa sử lý
  const inputUrl = useSelector((state) => state.clickUrl.value);
  const dataInputUrl = useSelector((state) => state.clickUrl.data);

  // Dữ liệu Video Chưa sử lý
  const inputVideo = useSelector((state) => state.clickVideo.value);
  const dataInputVideo = useSelector((state) => state.clickVideo.data);

  // Dữ liệu Audio Chưa sử lý
  const inputAudio = useSelector((state) => state.clickAudio.value);
  const dataInputAudio = useSelector((state) => state.clickAudio.data);

  // Dữ liệu Record Chưa sử lý
  const inputRecord = useSelector((state) => state.clickRecord.value);
  const dataInputRecord = useSelector((state) => state.clickRecord.data);

  // Dữ liệu Image Chưa sử lý
  const inputImage = useSelector((state) => state.clickImage.value);
  const dataInputImage = useSelector((state) => state.clickImage.data);

  // DỮ liệu select
  const selectData = useSelector((state) => state.clickSelect.data);
  // Thao tác lọc dữ liệu
  const handleData = () => {
    switch (selectData.type) {
      case "Text":
        const dataText = dataInputText.find((item, index) => {
          return selectData.id === index + 1;
        });
        console.log("checkInputText:", dataText);
        break;
      case "Image":
        const dataImage = dataInputImage.find((item, index) => {
          return selectData.id === index + 1;
        });
        console.log("checkDataImage:", dataImage);

        break;
      case "Video":
        const dataVideo = dataInputVideo.find((item, index) => {
          return selectData.id === index + 1;
        });
        console.log("checkInputVideo:", dataVideo);

        break;
      case "Audio":
        const dataAudio = dataInputAudio.find((item, index) => {
          return selectData.id === index + 1;
        });
        console.log("checkInputAudio:", dataAudio);

        break;
      case "URL":
        const dataUrl = dataInputUrl.find((item, index) => {
          return selectData.id === index + 1;
        });
        console.log("checkInputUrl:", dataUrl);

        break;
      case "Record":
        const dataRecord = dataInputRecord.find((item, index) => {
          return selectData.id === index + 1;
        });
        console.log("checkInputRecord:", dataRecord);

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

  const [preview, setPreview] = useState(tools[indexTool].preview);
  const [clicked, setClick] = useState(false);

  const parentRef = useRef();
  const [screen, setScreen] = useState(window.innerWidth >= 768);

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
          className="absolute left-0 top-0 z-[100] md:w-0 md:h-0 lg:w-0 lg:h-0 animation-[open-popup] transition-[0.25s] overlay_customzie bg-overlay md:bg-transparent lg:bg-transparent w-full h-full"
          ref={parentRef}
        >
          <Draggable onDrag={(e) => e.stopPropagation()} disabled={!customize}>
            <div className="z-100 max-h-[65%] w-[350px] container_customize scrollar-cus lg:min-h-[350px] md:min-h-[350px] overflow-auto bg-white md:w-[350px] lg:w-[350px] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed lg:top-[20%] md:top-[20%] md:right-0 lg:right-0">
              <div className="bpx-2 w-full">
                <div className="flex items-center justify-between text-lg font-bold pt-2 w-full border-b-2 mb-2 pb-3">
                  {title}
                  {screen && (
                    <Minus
                      size={20}
                      className="lg:hidden md:hidden cursor-pointer"
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
            className="md:hidden lg:hidden fixed top-[50%] right-0 bg-white border-[#3498DB] border p-3 flex items-center justify-center rounded-full"
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
