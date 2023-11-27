import React, { useState } from "react";
import {CloudArrowUp} from '@phosphor-icons/react'


function PopupDragFile({types}) {
    return (
        <div className="w-full h-full bg-black opacity-25 flex items-center justify-center">
            <div className="bg-white rounded-md w-[60%] h-[60%] flex items-center justify-center">
                <div className="border-dashed rounded-md border-blue w-[60%] h-[60%] border-2 flex flex-col justify-center items-center">
                    <CloudArrowUp size={80} className="text-gray" />
                    <p className="">Drag up your file with format like</p>
                    <div className="flex flex-row"> 
                        {types.map((type) => (
                           <p className="text-sm">{type}{' , '}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      );
}

export default PopupDragFile;