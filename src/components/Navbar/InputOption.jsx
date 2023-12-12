import { Swap, Trash } from "@phosphor-icons/react";
import React, { useState } from "react";

function InputOption() {
  return (
    <>
      <div className="flex flex-col bg-[#2f3640] text-white absolute right-[-5rem] top-[-6rem] rounded-sm px-4 py-2 shadow-xl w-[140px]">
        <div className="flex items-center justify-between py-2 border-b-2 border-gray-100">
          <Swap size={20} />
          <span>Transfer</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <Trash size={20} />
          <span>Delete</span>
        </div>
      </div>
    </>
  );
}

export default InputOption;