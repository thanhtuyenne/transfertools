import React, { useState } from "react";
import PopupDragFile from "../PopupDragFile/PopupDragFile";

function MediaBase({ IconComp, placeholder, accept}) {

    const [popup, setShowPopup] = useState(false);
    const openPopup = () => {
        setShowPopup(true);
    }

    return (
       <>
            <div className="cursor-pointer h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]"
            onClick={openPopup}>
            <IconComp size={20} className='text-blue mr-2'/>
             <div className="outline-none border-0 border-none focus:ring-0">
                <span className="text-[#6b7280]">{placeholder}</span>
             </div>
       </div>
       {popup && <PopupDragFile toggle={setShowPopup} accepts={accept} />}
       </>
      );
    }

export default MediaBase;