import {
  GooglePodcastsLogo,
  LinkSimple,
  Microphone,
} from "@phosphor-icons/react";
import React from "react";
import { Draggable } from "react-drag-and-drop";

function MobileOption({ addElement }) {
  return (
    <>
      <div className="flex flex-col bg-[#2f3640] text-white absolute left-[-6.5rem] top-[-14rem] rounded-sm px-4 py-2 shadow-xl w-[140px]">
        <Draggable className=" cursor-pointer" type="components" data="Audio">
          <div
            className="flex items-center justify-between py-2 cursor-pointer border-b-2 border-gray-100"
            onClick={() => addElement("Audio")}
          >
            <GooglePodcastsLogo size={20} />
            <span>Audio</span>
          </div>
        </Draggable>
        <Draggable className=" cursor-pointer" type="components" data="Record">
          <div
            className="flex items-center justify-between py-2 cursor-pointer border-b-2 border-gray-100"
            onClick={() => addElement("Record")}
          >
            <Microphone size={20} />
            <span>Record</span>
          </div>
        </Draggable>
        <Draggable className=" cursor-pointer" type="components" data="URL">
          <div
            className="flex items-center justify-between py-2 cursor-pointer"
            onClick={() => addElement("URL")}
          >
            <LinkSimple size={20} />
            <span>URL</span>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default MobileOption;
