import React, { useEffect, useState, useCallback } from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { DownloadSimple } from "@phosphor-icons/react";

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
  return (
    <>
      <div className="bg-white w-[20%] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed right-0 top-[20%]">
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
          <Button title="Transfer" />
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
