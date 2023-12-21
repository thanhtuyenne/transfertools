import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
function Box(props) {
  // const dispatch = useDispatch()
  // STATES AND STYLES AND VARIABLES
  const style = {
    zIndex: props.coor.z,
    width: `${props.coor.w}px`,
    height: `${props.coor.h}px`,
  };
  const ref = useRef(null);
  const leftResize = useRef(null);
  const rightResize = useRef(null);
  const topResize = useRef(null);
  const bottomResize = useRef(null);
  const topleftResize = useRef(null);
  const toprightResize = useRef(null);
  const bottomleftResize = useRef(null);
  const bottomrightResize = useRef(null);
  // FUNCTIONS
  const wsSize = () => {
    const workspace = document.querySelector(".whitespace");
    let rect;
    if (workspace) {
      rect = workspace.getBoundingClientRect();
      return { w: rect.width, h: rect.height };
    }
    return { w: 0, h: 0 };
  };
  // Turn the saved postion into absolute position
  const coorAbsolute = () => {
    if (wsSize().w && wsSize().h) {
      const xAbsolute = props.coor.x;
      const yAbsolute = wsSize().h - props.coor.h - props.coor.y;
      return { x: xAbsolute, y: yAbsolute };
    }
    return { x: 0, y: 0 };
  };
  // Turn the new absolute pos into saved relative pos
  const coorRelative = (x, y, h) => {
    // x, y is the absolute x,y passed in
    if (wsSize().w && wsSize().h) {
      const xRelative = x;
      const yRelative = wsSize().h - h - y;
      return { x: xRelative, y: yRelative };
    }
    return { x: 0, y: 0 };
  };
  const getRef = (s) => {
    if (["--left", "--top"].includes(s)) {
      return parseFloat(ref.current.style.getPropertyValue(s).slice(0, -2));
    }
    return 0;
  };

  // EVENT FUNCTIONS-------

  // USE EFFECTS
  useEffect(() => {
    // Select the box
    let startMouseX, startMouseY;
    let startX, startY;
    const handleMouseMove = (e) => {
      e.stopPropagation();
      let dx, dy;
      // New position of element
      dx = e.clientX - startMouseX + startX;
      dy = e.clientY - startMouseY + startY;
      // Update element position
      ref.current.style.setProperty("--left", `${dx}px`);
      ref.current.style.setProperty("--top", `${dy}px`);
      console.log("mouse");
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
      let dx, dy;
      // New position of element
      dx = e.touches[0].pageX - startMouseX + startX;
      dy = e.touches[0].pageY - startMouseY + startY;
      // Update element position
      ref.current.style.setProperty("--left", `${dx}px`);
      ref.current.style.setProperty("--top", `${dy}px`);
      console.log("touch");
    };
    // When user loosen the pointer
    const handleMouseUp = (e) => {
      // Clean up event listeners
      e.stopPropagation();
      ref.current.classList.remove("box-selected");
      document.removeEventListener("mousemove", handleMouseMove);
      // Update state
      const newXY = coorRelative(
        getRef("--left"),
        getRef("--top"),
        props.coor.h
      );
      props.updateCoors(
        props.coor.type,
        props.coor.id,
        {
          x: newXY.x,
          y: newXY.y,
          isSelected: true,
        },
        { isSelected: false }
      );
      props.openCustomize(props.type, props.coor.children);
      document.removeEventListener("mouseup", handleMouseUp);
      console.log(props.coor.isSelected);
    };

    const handleTouchEnd = (e) => {
      // Clean up event listeners
      e.stopPropagation();
      ref.current.classList.remove("box-selected");
      document.removeEventListener("touchmove", handleTouchMove);
      // ref.current.firstChild.classList.remove("touch-none");

      // Update state
      const newXY = coorRelative(
        getRef("--left"),
        getRef("--top"),
        props.coor.h
      );
      props.updateCoors(
        props.coor.type,
        props.coor.id,
        {
          x: newXY.x,
          y: newXY.y,
          isSelected: true,
        },
        { isSelected: false }
      );
      props.openCustomize(props.type, props.coor.children);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    const handleMouseDown = (e) => {
      // if (e.target !== e.currentTarget) return;
      e.stopPropagation();
      if (!ref.current.contains(e.target)) return;
      startX = getRef("--left");
      startY = getRef("--top");
      ref.current.classList.add("box-selected");
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      
      // Attach event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (e) => {
      // if (e.target !== e.currentTarget) return;
      e.stopPropagation();
      if (!ref.current.contains(e.target)) return;
      startX = getRef("--left");
      startY = getRef("--top");
      ref.current.classList.add("box-selected");
      // ref.current.firstChild.classList.add("touch-none");

      startMouseX = e.touches[0].pageX;
      startMouseY = e.touches[0].pageY;

      // Attach event listeners
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    };

    ref.current.addEventListener("mousedown", handleMouseDown);
    ref.current.addEventListener("touchstart", handleTouchStart);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousedown", handleMouseDown);
        ref.current.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [props.coor]);

  useEffect(() => {
    ref.current.style.setProperty("--left", `${coorAbsolute().x}px`);
    ref.current.style.setProperty("--top", `${coorAbsolute().y}px`);
  }, [props.coor]);

  useEffect(() => {
    // handling resizing boxes
    // Return is there isnt any box selected
    if (!props.coor.isSelected) return;
    const right = rightResize.current;
    const left = leftResize.current;
    const bottom = bottomResize.current;
    const top = topResize.current;
    const topleft = topleftResize.current;
    const topright = toprightResize.current;
    const bottomleft = bottomleftResize.current;
    const bottomright = bottomrightResize.current;
    const box = ref.current;
    // let styles;
    // if (box) styles = box.getComputedStyle(box);
    let x = 0;
    let y = 0;
    let width = props.coor.w;
    let height = props.coor.h;

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width += dx;
      width = width > props.coor.mw ? width : props.coor.mw;
      box.style.width = `${width}px`;
    };
    const onMouseUpRightResize = (event) => {
      props.updateCoors(props.coor.type, props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
      });
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      document.removeEventListener("mouseup", onMouseUpRightResize);
    };
    const onMouseDownRightResize = (event) => {
      event.stopPropagation();
      x = event.clientX; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height += dy;
      height = height > props.coor.mh ? height : props.coor.mh;

      box.style.height = `${height}px`;
    };
    const onMouseUpBottomResize = (event) => {
      const newY = props.coor.y - (height - props.coor.h);
      props.updateCoors(props.coor.type, props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
        y: newY,
      });
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
      document.removeEventListener("mouseup", onMouseUpBottomResize);
    };
    const onMouseDownBottomResize = (event) => {
      event.stopPropagation();
      y = event.clientY; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    // Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width -= dx;
      width = width > props.coor.mw ? width : props.coor.mw;
      box.style.width = `${width}px`;
      box.style.setProperty("--left", `${getRef("--left") + dx}px`);
    };
    const onMouseUpLeftResize = (event) => {
      let newXAbsolute = getRef("--left");
      props.updateCoors(props.coor.type, props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
        x: coorRelative(newXAbsolute, props.coor.y).x,
      });
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      document.removeEventListener("mouseup", onMouseUpLeftResize);
    };
    const onMouseDownLeftResize = (event) => {
      event.stopPropagation();
      x = event.clientX;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
    // Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height -= dy;
      height = height > props.coor.mh ? height : props.coor.mh;
      box.style.height = `${height}px`;
      box.style.setProperty("--top", `${getRef("--top") + dy}px`);
    };
    const onMouseUpTopResize = (event) => {
      props.updateCoors(props.coor.type, props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
      });
      document.removeEventListener("mousemove", onMouseMoveTopResize);
      document.removeEventListener("mouseup", onMouseUpTopResize);
    };
    const onMouseDownTopResize = (event) => {
      event.stopPropagation();
      y = event.clientY;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    right.addEventListener("mousedown", onMouseDownRightResize);
    bottom.addEventListener("mousedown", onMouseDownBottomResize);
    left.addEventListener("mousedown", onMouseDownLeftResize);
    top.addEventListener("mousedown", onMouseDownTopResize);
    // For rounded resizer
    topleft.addEventListener("mousedown", onMouseDownLeftResize);
    topleft.addEventListener("mousedown", onMouseDownTopResize);
    topright.addEventListener("mousedown", onMouseDownRightResize);
    topright.addEventListener("mousedown", onMouseDownTopResize);
    bottomleft.addEventListener("mousedown", onMouseDownLeftResize);
    bottomleft.addEventListener("mousedown", onMouseDownBottomResize);
    bottomright.addEventListener("mousedown", onMouseDownRightResize);
    bottomright.addEventListener("mousedown", onMouseDownBottomResize);

    return () => {
      right.removeEventListener("mousedown", onMouseDownRightResize);
      bottom.removeEventListener("mousedown", onMouseDownBottomResize);
      left.removeEventListener("mousedown", onMouseDownLeftResize);
      top.removeEventListener("mousedown", onMouseDownTopResize);
      topleft.removeEventListener("mousedown", onMouseDownLeftResize);
      topleft.removeEventListener("mousedown", onMouseDownTopResize);
      topright.removeEventListener("mousedown", onMouseDownRightResize);
      topright.removeEventListener("mousedown", onMouseDownTopResize);
      bottomleft.removeEventListener("mousedown", onMouseDownLeftResize);
      bottomleft.removeEventListener("mousedown", onMouseDownBottomResize);
      bottomright.removeEventListener("mousedown", onMouseDownRightResize);
      bottomright.removeEventListener("mousedown", onMouseDownBottomResize);
    };
  }, [props.coor]);

  return (
    <div
      ref={ref}
      className={` bg-white border-[1px] border-black box ${
        props.coor.isSelected && "box-selected"
      }`}
      style={style}
    >
      {/* Children here */}
      {/* <span className="text-black absolute -top-6 left-0 w-full truncate text-left">New {props.coor.type}</span> */}
      {props.coor.children}
      {/* <div>
        My name is
      </div> */}
      {/* Resizing Bars and Dragging  */}
      {props.coor.isSelected && (
        <>
          {/* Bar resizer */}
          <div ref={leftResize} className="resizer resizer-left"></div>
          <div ref={rightResize} className="resizer resizer-right"></div>
          <div ref={topResize} className="resizer resizer-top"></div>
          <div ref={bottomResize} className="resizer resizer-bottom"></div>
          {/* Round resizer */}
          <div
            ref={topleftResize}
            className="resizer resizer-topleft round-resizer"
          ></div>
          <div
            ref={toprightResize}
            className="resizer resizer-topright round-resizer"
          ></div>
          <div
            ref={bottomleftResize}
            className="resizer resizer-bottomleft round-resizer"
          ></div>
          <div
            ref={bottomrightResize}
            className="resizer resizer-bottomright round-resizer"
          ></div>
        </>
      )}
    </div>
  );
}

export default Box;
