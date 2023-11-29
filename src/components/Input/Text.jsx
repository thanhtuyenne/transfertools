import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  TextT,
  LinkSimple,
  Microphone,
  WarningCircle,
} from "@phosphor-icons/react";
import Notify from "../Notify/Notify";

// export const Noti = (message) => {
//   return (
//     <span>
//       <WarningCircle
//         size={15}
//         className="text-white bg-red-600 rounded-full absolute bottom-2 right-2"
//       />
//       <span className="absolute top-0 bg-red-300 border-black border-1 bottom-2 ">
//         <nav>{message}</nav>
//       </span>
//     </span>
//   );
// };
export const TextInput = () => {
  const [message, setMessage] = useState("");
  //   const [isvalid, setIsValid] = useState(false);

  const validate = (text) => {
    console.log(text.length);
    if (text.length === 0) {
      setMessage("Your text can't be empty");
      console.log("check");
      return;
    }
    setMessage("");
  };
  return (
    <div className="relative min-h-[40px] border-blue border-2 rounded-md inline-flex justify-center items-center p-[11px]">
      <TextT size={20} className="text-blue bg-transparent mr-2" />
      <TextareaAutosize
        onChange={(ev) => validate(ev.target.value)}
        className="outline-none border-0 border-none focus:ring-0 bg-transparent flex-grow overflow-y-scroll no-scrollbar p-0 mr-5"
        placeholder="Enter your text ..."
        minRows={1}
        maxRows={10}
      />
      {message.length > 0 && <Notify message={message} />}
    </div>
  );
};

export const URLInput = () => {
  const [mess, setMess] = useState("");
  const regexURL =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const validateURL = (url) => {
    if (!url.match(regexURL)) {
      setMess("Your URL is not valid");
      return;
    }
    setMess("");
  };
  return (
    <div className="relative h-[40px] border-blue border-2 rounded-md inline-flex items-center p-[11px]">
      <LinkSimple size={20} className="text-blue" />
      <input
        onChange={(ev) => validateURL(ev.target.value)}
        type="url"
        placeholder="Enter your text ..."
        className="outline-none border-0 border-none focus:ring-0 bg-transparent  "
      />
      {mess.length > 0 && <Notify message={mess} />}
    </div>
  );
};

export const Record = () => {
  return (
    <div className="h-[40px] border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
      <Microphone size={20} className="text-blue" />
      <input
        type=""
        className="outline-none border-0 border-none focus:ring-0 bg-transparent "
      />
    </div>
  );
};

// export default Text;
