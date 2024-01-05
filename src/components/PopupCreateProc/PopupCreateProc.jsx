import { XCircle } from "@phosphor-icons/react/dist/ssr";
import React, { useRef } from "react";

const types = ["Text", "Image", "Audio", "Video", "Record", "URL"];

function PopupCreateProc(props) {
  const appendProc = (name, list) => {
    console.log(name, list);
    props.procedureList.push({
      name: name,
      list: list,
    });
    console.log(props.procedureList);
  };
  let list;
  const listArr = [];

  const nameRef = useRef();

  // const splitArr = (val) => {
  //   val.innerHTML.trim().split(" - "); // Text - Image - Audio
  // };
  return (
    <div className="fixed bg-overlay w-full h-full top-0 left-0 z-20">
      <div className="w-[400px] h-fit bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-md text-blue">
        <div className="cursor-pointer font-bold bg-[#e74c3c] p-1 rounded-bl-[15px] top-0 right-0 absolute">
          <XCircle size={20} color="white" />
        </div>
        <h2 className="font-bold text-lg my-2 mx-1 text-center">
          CREATE YOUR PROCEDURE
        </h2>
        <div className="flex flex-col my-2">
          <span className="text-[#2f3542] font-bold">Procedure Name</span>
          <input
            type="text"
            ref={nameRef}
            className="h-[40px] outline-none border-blue rounded-md text-black"
          />
        </div>
        <div>
          <span className="text-[#2f3542] font-bold">Procedure Selection</span>
          <div
            id="procSelection"
            className="w-full min-h-[40px] text-[#2f3542] max-h-[80px] overflow-auto p-2 scrollar-cus border border-blue rounded-md bg-white break-words"
          >
            {"  "}
          </div>
        </div>
        {/* selection zone */}
        <div className="flex flex-wrap justify-evenly items-center my-2">
          {types.map((type) => {
            return (
              <span
                onClick={() => {
                  list = document.getElementById("procSelection");
                  listArr.push(type);
                  list.innerHTML = listArr.join(" - ");
                }}
                className="text-center mx-4 my-2 w-[70px] cursor-pointer bg-white border border-blue rounded-md text-blue py-2 font-bold transition-[0.25s]"
              >
                {type}
              </span>
            );
          })}
        </div>
        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              appendProc(
                nameRef.current.value,
                list.innerHTML.trim().split(" - ")
              );
              props.setCreate(false);
            }}
            className="border border-blue text-white font-bold bg-blue cursor-pointer rounded-md p-1 w-[100px] hover:w-[120px] transition-[0.25s] hover:font-bold"
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupCreateProc;
