import React, { useEffect, useRef } from "react";

export default function ContextMenu({
  containerRef,
  contextMenuRef,
  callback = () => {},
}) {
  function handleClickOutside(event) {
    if (event.target.contains(contextMenuRef?.current)) {
      callback();
    }
    // if (
    //   containerRef?.current?.contains(event.target)
    //   // &&
    //   //   !contextMenuRef?.current?.contains(event.target)
    // ) {
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
