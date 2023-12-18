import React, { useState } from "react";
import { GearSix } from "@phosphor-icons/react";
import Popup from "reactjs-popup";
import Setting from "../Setting/Setting";

function ToggleSwitch() {
  const [toggle, setToggle] = useState(false);
  const handleChange = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <Popup
        trigger={
          <div className="relative flex items-center font-bold bg-[#3498DB] text-white w-[110px] cursor-pointer p-2 rounded-md justify-between">
            <span className="text-lg">Setting</span>
            <GearSix size={26} />
          </div>
        }
        arrow={false}
      >
        <Setting />
      </Popup>
    </div>
  );
}

export default ToggleSwitch;
