import { Microphone } from "@phosphor-icons/react";
import React from "react";

function Record() {
  return (
    <div className="bg-white cursor-pointer h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
      <Microphone size={20} className="text-blue mr-2" />
      <div className="outline-none border-0 border-none focus:ring-0">
        <span className="text-[#6b7280]">Click to record</span>
      </div>
    </div>
  );
}

export default Record;
