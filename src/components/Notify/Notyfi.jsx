import { WarningCircle } from "@phosphor-icons/react";
import React, { useState } from "react";

function Notify({ message }) {
  const [hover, setHover] = useState(false);
  return (
    <span>
      <WarningCircle
        size={15}
        className="text-white bg-red-600 rounded-full absolute bottom-2 right-2 "
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      {hover && (
        <span className="absolute top-0 bg-red-600 border-black border-1 bottom-2 w-56 rounded-md p-1 flex items-center ml-2">
          <nav className="text-white">{message}</nav>
        </span>
      )}
    </span>
  );
}

export default Notify;
