import React from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import {DownloadSimple} from '@phosphor-icons/react'

function Customize({toVoice}) {
    const PitchList = [1, 0.5, 2];
    const SpeechList = ["1x", '2x', '0.5x'];
    const VoiceList = ["William", "Alice", "John", "Sarah", 'Google'];
    return <>
        <div className="w-[20%] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] px-3 pb-0 fixed right-0 top-[10%]">
        {toVoice &&
            <div className="border-b-2 px-0 p-3">
                <p className="text-lg font-bold border-b-2 mb-2 pb-3 ">Customize</p>
                <div className="flex flex-row justify-between ">
                    <Dropdownlist title="Pitch" options={PitchList}/>
                    <Dropdownlist title="Speech" options={SpeechList} />
                </div>
                <Dropdownlist title="Voice" options={VoiceList} />
                <div className="flex justify-end"><Button title="Transfer"/></div>
            </div>
        }
        <div className="flex items-center justify-between p-2">
            <p className="text-md font-bold pt-2">Export</p>
            <div> <abbr title="Export"><DownloadSimple size={20} className="text-black cursor-pointer hover:text-blue transition-all" /></abbr></div>
        </div>
        </div>
    </>

}

export default Customize;