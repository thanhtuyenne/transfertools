import React, { useState } from "react";
import { GearSix } from "@phosphor-icons/react";
import Popup from "reactjs-popup";
import PopupSetting from "../PopupSetting/PopupSetting";

function ToggleSwitch() {
  return (
    <div>
      <Popup
        trigger={
          <div className="relative flex items-center font-bold bg-[#3498DB] text-white w-[110px] cursor-pointer lg:p-2 py-[4px] px-[8px] rounded-md justify-center lg:justify-between">
            <span className="text-[16px] uppercase">Setting</span>
            <GearSix size={26} className="hidden lg:block" />
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
