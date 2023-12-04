<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> main
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { DownloadSimple } from "@phosphor-icons/react";

function Customize({ title, tools = [] }) {
  const PitchList = [1, 0.5, 2];
  const SpeechList = ["1x", "2x", "0.5x"];
  const VoiceList = ["William", "Alice", "John", "Sarah", "Google"];
  const [dataI,setDataI]= useState([])
  //LIST DRAFT
  const elements = ["BOX1", "BOX2", "BOX3"];
  const [toVoice, setToVoice] = useState(false);
  return (
    <>
      <div className="bg-white w-[20%] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed right-0 top-[20%]">
        <div className="border-b-2 px-2 w-full">
          <div className="text-lg font-bold pt-2 w-full border-b-2 mb-2 pb-3">
            {title}
          </div>
          {/* <div className="flex justify-between my-2 items-center w-full">
            {/* <span>Data</span> */}
          {/* </div> */}
          <Dropdownlist title="Tools" options={tools} />
        </div>
        {toVoice && (
          <div className="border-b-2 px-0 p-3">
            <p className="text-lg font-bold border-b-2 mb-2 pb-3 ">Customize</p>
            <div className="flex flex-row justify-between ">
              <Dropdownlist title="Pitch" options={PitchList} />
              <Dropdownlist title="Speech" options={SpeechList} />
            </div>
            <Dropdownlist title="Voice" options={VoiceList} />
            {/* <div className="flex justify-end">
              <Button title="Transfer" />
            </div> */}
          </div>
        )}
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
