import React from "react";
import { TextT, LinkSimple, Microphone } from "@phosphor-icons/react";

export const TextInput = () => {
    return (
        <div className="h-[40px] border-blue border-2 rounded-md inline-flex justify-center items-center overflow-hidden p-[11px]">
            <TextT size={20} className='text-blue bg-transparent'/>
             <input type="text" placeholder="Enter your text ..." className="outline-none border-0 border-none focus:ring-0 bg-transparent "/>
       </div>
    )
}

export const URLInput = () => {

    return (
        <div className="h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
            <LinkSimple size={20} className='text-blue'/>
             <input type="url" placeholder="Enter your text ..." className="outline-none border-0 border-none focus:ring-0 bg-transparent "/>
       </div>
    )
}

export const Record = () => {
    return (
        <div className="h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
            <Microphone size={20} className='text-blue'/>
             <input type="" className="outline-none border-0 border-none focus:ring-0 bg-transparent "/>
       </div>
    )
}

// export default Text;