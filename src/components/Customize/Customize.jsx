import React, { useEffect, useState, useCallback } from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { DownloadSimple } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

function Customize({ title, tools = [] }) {
  // const [toolsSelected, setToolsSelected] = useState(0);
  // const handleToolSelected = (value) => {
  //   setToolsSelected(value);
  // };
  const [indexTool, setIndexTool] = useState(0);
  const [currentTool, setCurrentTool] = useState(tools[indexTool].comp);
  const displayToolSelected = useCallback(
    (toolIndex = 0) => {
      setIndexTool(toolIndex);
      setCurrentTool(tools[toolIndex].comp);
    },
    [tools]
  );
  useEffect(() => {
    setIndexTool(0);
    displayToolSelected(0);
  }, [displayToolSelected, tools]);
  // const [dataI,setDataI]= useState([])
  //LIST DRAFT
  // const elements = ["BOX1", "BOX2", "BOX3"];
  const [toVoice, setToVoice] = useState(false);
  const transfer = useSelector((state) => state.typeModel.value);
  const inputText = useSelector((state) => state.clickText.value);
  const inputUrl = useSelector((state) => state.clickUrl.value);
  const inputVideo = useSelector((state) => state.clickVideo.value);
  const inputAudio = useSelector((state) => state.clickAudio.value);
  const inputRecord = useSelector((state) => state.clickRecord.value);
  const inputImage = useSelector((state) => state.clickImage.value);

  return (
    <>
      <div className="bg-white w-[350px] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed right-0 top-[20%]">
        <div className="border-b-2 px-2 w-full">
          <div className="text-lg font-bold pt-2 w-full border-b-2 mb-2 pb-3">
            {title}
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
            <Button title="Transfer" />
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center justify-between p-2">
          <p className="text-lg font-bold">Export</p>
          <div>
            {" "}
            <abbr title="Export">
              <DownloadSimple
                size={20}
                className="text-black cursor-pointer hover:text-blue transition-all"
              />
            </abbr>
          </div>
        </div>
      </div>
    </>
  );
}
export default Customize;
