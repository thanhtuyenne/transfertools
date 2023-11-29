import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import React from "react";

function BotChat({ closeBotChat }) {
  return (
    <div className="overflow-hidden z-10 bg-white border-[#ccc] border-2 w-[360px] h-[55%] fixed right-3 bottom-2 shadow-sm">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between p-2 items-center">
          <span className="text-lg font-bold">BOT AI</span>
          <X
            size={24}
            className="cursor-pointer"
            onClick={() => closeBotChat(false)}
          />
        </div>
        <div className="overflow-auto"></div>
        <div className="flex border-t-2 w-full items-center absolute bottom-0 h-12">
          <input
            type="text"
            placeholder="Aa"
            className="w-[90%] border-none outline-none focus:ring-0 "
          />
          <PaperPlaneTilt
            size={24}
            className="cursor-pointer text-black transition-[0.25s] hover:text-blue"
          />
        </div>
      </div>
    </div>
  );
}

export default BotChat;
