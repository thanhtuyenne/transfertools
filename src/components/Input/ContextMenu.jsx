import React, { useEffect, useRef } from "react";

export default function ContextMenu({
  containerRef,
  contextMenuRef,
  callback = () => {},
}) {
  function handleClickOutside(event) {
    if (event.target.contains(contextMenuRef?.current)) {
      //console.log("click outside");
      callback();
    }
    // if (
    //   containerRef?.current?.contains(event.target)
    //   // &&
    //   //   !contextMenuRef?.current?.contains(event.target)
    // ) {
    //   //console.log("click outside");
    //   callback();
    // }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
