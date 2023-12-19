import { Chats } from "@phosphor-icons/react/dist/ssr";
import "./header.css";
import { useState } from "react";
import BotChat from "../BotChat/BotChat";
import ToggleSwitch from "../Button/ToggleSwitch";
import Popup from "reactjs-popup";
import Setting from "../PopupSetting/PopupSetting";

const Header = () => {
  const [botChat, setBotChat] = useState(false);
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
