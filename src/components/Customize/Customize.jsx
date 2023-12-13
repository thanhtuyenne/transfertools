import React, { useEffect, useState, useCallback, useRef } from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import "./Customize.css";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Swap,
  XCircle,
} from "@phosphor-icons/react";

function Customize({ title, tools = [], isOpen }) {
  // const [toolsSelected, setToolsSelected] = useState(0);
  // const handleToolSelected = (value) => {
  //   setToolsSelected(value);
  // };
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

  const transfer = useSelector((state) => state.typeModel.value);
  const inputText = useSelector((state) => state.clickText.value);
  const inputUrl = useSelector((state) => state.clickUrl.value);
  const inputVideo = useSelector((state) => state.clickVideo.value);
  const inputAudio = useSelector((state) => state.clickAudio.value);
  const inputRecord = useSelector((state) => state.clickRecord.value);
  const inputImage = useSelector((state) => state.clickImage.value);

  const [preview, setPreview] = useState(tools[indexTool].preview);
  const [clicked, setClick] = useState(false);

  const parentRef = useRef();
  const [isHide, setHide] = useState(false);

  const handleSlideRight = () => {
    // parentRef.current.style.left = "135%";
    setHide(true);
  };

  return (
    <>
      {!isHide ? (
        <div
          className="absolute z-[100] md:w-0 md:h-0 lg:w-0 lg:h-0 animation-[open-popup] transition-[0.25s] overlay_customzie bg-overlay md:bg-transparent lg:bg-transparent w-full h-full"
          ref={parentRef}
          onClick={() => setHide(true)}
        >
          <div
            // ref={parentRef}
            className="z-100 max-h-[65%] w-[90%] container_customize scrollar-cus lg:min-h-[350px] lg:max-h-[450px] md:min-h-[350px] md:max-h-[450px] overflow-auto bg-white md:w-[350px] lg:w-[350px] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed top-[20%] md:right-0 lg:right-0"
          >
            <div className="bpx-2 w-full">
              <div className="flex items-center justify-between text-lg font-bold pt-2 w-full border-b-2 mb-2 pb-3">
                {/* {isHide && (
                  <ArrowLeft
                    size={20}
                    className="cursor-pointer lg:hidden md:hidden"
                    onClick={() => handleSlideLeft()}
                  />
                )} */}
                {title}
                {!isHide && (
                  <Minus
                    size={20}
                    className="lg:hidden md:hidden cursor-pointer"
                    onClick={() => handleSlideRight()}
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
        </div>
      ) : (
        <div
          className="md:hidden lg:hidden fixed top-[50%] right-0 bg-white border-[#3498DB] border p-3 flex items-center justify-center rounded-full"
          onClick={() => setHide(false)}
        >
          <Swap size={32} className="" color="#3498DB" />
        </div>
      )}
    </>
  );
}
export default Customize;
