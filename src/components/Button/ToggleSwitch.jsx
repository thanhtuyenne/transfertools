import React, { useState } from "react";
import { GearSix } from "@phosphor-icons/react";

function ToggleSwitch() {
  const [toggle, setToggle] = useState(false);
  const handleChange = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div
        className={`relative border-2 rounded-full w-[90px] h-[40px] ml-2 ${
          !toggle ? `bg-white border-[#3498DB]` : `bg-[#3498DB] border-none`
        }`}
      >
        <div
          className={`ml-1 p-1 cursor-pointer absolute rounded-full transition-[1.5s] top-[50%] translate-y-[-50%] ${
            !toggle ? `bg-[#3498DB] left-0 ` : `left-[50%] bg-white`
          }`}
          onClick={() => handleChange()}
        >
          <GearSix size={26} color={!toggle ? "white" : "#3498DB"} />
        </div>
      </div>
    </>
  );
}

export default ToggleSwitch;
