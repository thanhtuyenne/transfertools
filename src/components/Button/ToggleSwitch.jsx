import React, { useState } from "react";
import { GearSix } from "@phosphor-icons/react";
import Popup from "reactjs-popup";
import PopupSetting from "../PopupSetting/PopupSetting";

function ToggleSwitch() {
  return (
    <div>
      <Popup
        trigger={
          <div className="relative flex items-center font-bold bg-[#3498DB] text-white w-[110px] cursor-pointer p-2 rounded-md justify-between">
            <span className="text-lg">Setting</span>
            <GearSix size={26} />
          </div>
        }
        closeOnDocumentClick={false}
        arrow={false}
      >
        <PopupSetting />
      </Popup>
    </div>
  );
}

export default ToggleSwitch;
