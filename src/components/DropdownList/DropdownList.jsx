import React, { useState, useRef, useEffect } from "react";

function Dropdownlist({ title, options, callback, selected }) {
  return (
    <div className="flex flex-col mx-1 my-2 w-full">
      <p>{title}</p>
      {
        <select
          onChange={(e) => callback(e.target.value)}
          className="w-full border-gray-300 rounded-md h-full"
          value={selected}
        >
          {options.map((o, i) => (
            <option value={i} className="text-black p-2 text-lg">
              {o}
            </option>
          ))}
        </select>
      }
    </div>
  );
}

export default Dropdownlist;
