import {
  GooglePodcastsLogo,
  LinkSimple,
  Microphone,
} from "@phosphor-icons/react";
import React from "react";

function MobileOption() {
  return (
    <>
      <div className="flex flex-col bg-[#2f3640] text-white absolute left-[-6rem] top-[-14rem] rounded-sm px-4 py-2 shadow-xl w-[140px]">
        <div className="flex items-center justify-between py-2 cursor-pointer border-b-2 border-gray-100">
          <GooglePodcastsLogo size={20} />
          <span>Audio</span>
        </div>
        <div className="flex items-center justify-between py-2 cursor-pointer border-b-2 border-gray-100">
          <Microphone size={20} />
          <span>Record</span>
        </div>
        <div className="flex items-center justify-between py-2 cursor-pointer">
          <LinkSimple size={20} />
          <span>URL</span>
        </div>
      </div>
    </>
  );
}

export default MobileOption;
