import { Chats } from "@phosphor-icons/react/dist/ssr";
import "./header.css";
import { useState } from "react";
import BotChat from "../BotChat/BotChat";
import ToggleSwitch from "../Button/ToggleSwitch";

const Header = (props) => {
  const [botChat, setBotChat] = useState(false);
  const proc = ["Video", "Image", "Audio", "Text"];

  return (
    <>
      <div className="headerTrans">
        <div>
          <ToggleSwitch />
        </div>
        <div className="flex items-center">
          <abbr title="BotChat">
            <button className="p-2 btn-botAI" onClick={() => setBotChat(true)}>
              <Chats size={30} />
            </button>
          </abbr>
          <button
            className="btn-save p-1"
            onMouseDown={() => {
              props.setDefaultPosition(proc);
            }}
            onMouseUp={() => {
              props.createProcedures(proc);
            }}
          >
            PROC
          </button>
          <div className="btn-save">
            <span>SAVE</span>
          </div>
        </div>
      </div>
      {botChat && <BotChat closeBotChat={setBotChat} />}
    </>
  );
};

export default Header;
