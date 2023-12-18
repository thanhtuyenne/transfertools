import { Option, Swap } from "@phosphor-icons/react";
import React, { useState } from "react";

function Setting({ Toolbox, Custom }) {
  const [activeToolbox, setActiveToolbox] = useState(false);
  const [activeCustom, setActiveCustom] = useState(false);

  return (
    <>
      <div className="w-[250px] absolute top-6 left-[-3rem] bg-white text-[#2f3542] shadow-md rounded-md px-3 py-3">
        <span className="font-bold text-lg">Lock / Unlock</span>
        <div
          onClick={() => {
            setActiveToolbox(!activeToolbox);
            Toolbox(true);
          }}
          className={`my-2 flex items-center border-2 w-[100%] p-2 justify-around cursor-pointer transition-[0.25s]
          ${activeToolbox && "border-[#3498DB] text-[#3498DB]"}`}
        >
          <Swap size={26} />
          <span className="text-[1.2rem]">Toolbox</span>
        </div>
        <div
          onClick={() => {
            setActiveCustom(!activeCustom);
            Custom(true);
          }}
          className={`my-2 flex items-center border-2 w-[100%] p-2 justify-around cursor-pointer transition-[0.25s]
          ${activeCustom && "border-[#3498DB] text-[#3498DB]"}`}
        >
          <Option size={20} />
          <span>Customize</span>
        </div>
      </div>
    </>
  );
}

export default Setting;
