import React, { useState } from "react";
import Dropdownlist from "../DropdownList/DropdownList";

function ToSpeech() {
  const [pitch, setPitch] = useState(0);
  const [speech, setSpeech] = useState(0);
  const [voice, setVoice] = useState(0);
  const PitchList = [1, 0.5, 2];
  const SpeechList = ["1x", "2x", "0.5x"];
  const VoiceList = ["William", "Alice", "John", "Sarah", "Google"];
  return (
    <div className="px-0 p-3">
      <p className="text-lg font-bold border-b-2 mb-2 pb-3 ">Customize</p>
      <div className="flex flex-row justify-between ">
        <Dropdownlist
          title="Pitch"
          options={PitchList}
          callback={setPitch}
          selected={pitch}
        />
        <Dropdownlist
          title="Speech"
          options={SpeechList}
          callback={setSpeech}
          selected={speech}
        />
      </div>
      <Dropdownlist
        title="Voice"
        options={VoiceList}
        callback={setVoice}
        selected={voice}
      />
      {/* <div className="flex justify-end">
          <Button title="Transfer" />
        </div> */}
    </div>
  );
}

export default ToSpeech;
