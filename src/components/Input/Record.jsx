import { Microphone, Pause, Record as R } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
function Record() {
  const [record, setRecord] = useState(false);
  const [click, setClick] = useState(false);
  const [recordValue, setRecordValue] = useState("");
  const reControl = useAudioRecorder();

  useEffect(() => {
    if (!reControl.recordingBlob) return;
    console.log(reControl.recordingBlob);
    addAudioElement(reControl.recordingBlob);
  }, [reControl.recordingBlob]);

  const startRecord = () => {
    console.log("Start Record");
    setRecord(true);
  };

  const stopRecord = () => {
    console.log("STOP RECORD");
    setRecord(false);
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setRecordValue(url);
  };
  return (
    <>
      <div className="bg-white w-full h-full cursor-pointer border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
        <Microphone size={20} className="text-blue mr-2" />
        <div className="outline-none border-0 border-none focus:ring-0 flex-1 text-center">
          {click ? (
            <div className="flex flex-col">
              <div className="flex">
                {!record ? (
                  <div
                    className="flex border-2 border-black w-fit px-3 py-1 rounded-md cursor-pointer items-center justify-around"
                    onClick={startRecord}
                  >
                    
                    <R
                      size={28}
                      color="red"
                      className="transition-[0.25s] mr-1"
                    />
                    <span className="text-black">Start</span>
                  </div>
                ) : (
                  <div
                    className="flex border-2 border-black w-fit px-3 py-1 rounded-md cursor-pointer items-center justify-around"
                    onClick={() => {
                      stopRecord();
                    }}
                  >
                    <Pause size={28} color="red" />
                    <span className="text-black">Stop</span>
                  </div>
                )}
              </div>

              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                recorderControls={reControl}
                downloadFileExtension="webm"
                showVisualizer={true}
              />
            </div>
          ) : (
            <span className="text-black" onClick={() => setClick(true)}>
              Click to record
            </span>
          )}
          {recordValue && <audio id="audio" controls src={recordValue}></audio>}
        </div>
        {/* <ReactMic record={record} onData={onData} onStop={onStop} /> */}
      </div>
      {/* <button onClick={startRecord} type="button" className="text-black">
        Start
      </button>
      <button onClick={stopRecord} type="button" className="text-black">
        Stop
      </button> */}
    </>
  );
}

export default Record;
