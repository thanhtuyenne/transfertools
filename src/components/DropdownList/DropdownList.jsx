import React, { useState } from "react";

function Dropdownlist({ title, options, selected }) {
  return (
    <div className="flex flex-col mx-1 my-2 w-full">
      <p>{title}</p>
      <select
        onChange={(e) => selected(e.target.value)}
        className="w-full border-gray-300 rounded-md h-full"
      >
        {/* <option value="Select" /> */}
        {options.map((o, i) => (
          <option value={i} className="text-black p-2 text-lg">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdownlist;
