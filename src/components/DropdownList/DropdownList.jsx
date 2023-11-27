import React, { useState } from "react";

function Dropdownlist({title, options}) {
    const [option, setOption] = useState("");

    return (
        <div className="flex flex-col mx-1 my-2 w-full">
            <p>{title}</p>
            <select onChange={e => setOption(e.target.value)} className="w-full h-9 border-gray-300 rounded-md">
                {/* <option value="Select" /> */}
                {options.map((o) => (
                    <option value={option} className="text-black text-sm">{o}</option>
                ))}
            </select>
        </div>
      );
}

export default Dropdownlist;