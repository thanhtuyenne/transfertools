import React, { useEffect, useState, useCallback, useRef } from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import "./Customize.css";
import { Minus, Swap, XCircle } from "@phosphor-icons/react";
import Draggable from "react-draggable";

function Customize({ boxSelected, title, tools = [] }) {
  const [dataSample, setDataSample] = useState([]);
  useEffect(() => {
    console.log(boxSelected);
  }, [boxSelected]);
  // const [toolsSelected, setToolsSelected] = useState(0);
  // const handleToolSelected = (value) => {
  //   setToolsSelected(value);
  // };
  function randomUUID() {
    const hexDigits = "0123456789abcdef";
    let uuid = "";

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += "_";
      } else if (i === 14) {
        uuid += "4";
      } else if (i === 19) {
        uuid += hexDigits[(Math.random() * 4) | 8];
      } else {
        uuid += hexDigits[(Math.random() * 16) | 0];
      }
    }

    return uuid;
  }

  const importData = (id, type, value) => {
    const newDataSample = [...dataSample, { id: id, type: type, value: value }];
    setDataSample(newDataSample);
  };

  const [indexTool, setIndexTool] = useState(0);
  const [currentTool, setCurrentTool] = useState(tools[indexTool].comp);
  const displayToolSelected = useCallback(
    (toolIndex = 0) => {
      setClick(false);
      setIndexTool(toolIndex);
      setCurrentTool(tools[toolIndex].comp);
      setPreview(tools[toolIndex].preview);
    },
    [tools]
  );
  useEffect(() => {
    setIndexTool(0);
    displayToolSelected(0);
  }, [displayToolSelected, tools]);

  // Dữ liệu gồm id, type của mỗi input được kéo lên screen
  const idType = useSelector((state) => state.clickIdType.data);

  // Thao tác nhấn nút transfer
  const transfer = useSelector((state) => state.typeModel.value);

  // Dữ liệu inputText Chưa sử lý
  const inputText = useSelector((state) => state.clickText.value);
  const dataInputText = useSelector((state) => state.clickText.data);

  // Dữ liệu inputUrl Chưa sử lý
  const inputUrl = useSelector((state) => state.clickUrl.value);
  const dataInputUrl = useSelector((state) => state.clickUrl.data);

  // Dữ liệu Video Chưa sử lý
  const inputVideo = useSelector((state) => state.clickVideo.value);
  const dataInputVideo = useSelector((state) => state.clickVideo.data);

  // Dữ liệu Audio Chưa sử lý
  const inputAudio = useSelector((state) => state.clickAudio.value);
  const dataInputAudio = useSelector((state) => state.clickAudio.data);

  // Dữ liệu Record Chưa sử lý
  const inputRecord = useSelector((state) => state.clickRecord.value);
  const dataInputRecord = useSelector((state) => state.clickRecord.data);

  // Dữ liệu Image Chưa sử lý
  const inputImage = useSelector((state) => state.clickImage.value);
  const dataInputImage = useSelector((state) => state.clickImage.data);
  // DỮ liệu select
  const selectData = useSelector((state) => state.clickSelect.data);

  // Thao tác lọc dữ liệu
  const handleData = () => {
    switch (selectData.type) {
      case "Text":
        const dataText = dataInputText.find((item, index) => {
          return selectData.id === index + 1;
        });
        break;
      case "Image":
        const dataImage = dataInputImage.find((item, index) => {
          return selectData.id === index + 1;
        });

        break;
      case "Video":
        const dataVideo = dataInputVideo.find((item, index) => {
          return selectData.id === index + 1;
        });

        break;
      case "Audio":
        const dataAudio = dataInputAudio.find((item, index) => {
          return selectData.id === index + 1;
        });

        break;
      case "URL":
        const dataUrl = dataInputUrl.find((item, index) => {
          return selectData.id === index + 1;
        });

        break;
      case "Record":
        const dataRecord = dataInputRecord.find((item, index) => {
          return selectData.id === index + 1;
        });

        break;
      default:
        break;
    }
  };
  useEffect(() => {
    handleData();
  }, [
    idType,
    dataInputText,
    dataInputImage,
    dataInputVideo,
    dataInputAudio,
    dataInputUrl,
    dataInputRecord,
  ]);

  const [preview, setPreview] = useState(tools[indexTool].preview);
  const [clicked, setClick] = useState(false);

  const parentRef = useRef();
  const [screen, setScreen] = useState(window.innerWidth >= 768);

  const handleClosePopup = () => {
    setScreen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customize = useSelector((state) => state.customize.value);
  const [audioReview, setAudioReview] = useState(<></>);
  const audio_review = useRef();
  //request api
  const tts_google = async () => {
    var text = boxSelected.children.ref.current.value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const output_name = randomUUID();

    var raw = JSON.stringify({
      text: text,
      output_name: output_name,
      lang: "vi",
      slow_speech: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(
      "https://www.netdancetalent.asia/tts/google",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        preview.ref.current.src = `https://www.netdancetalent.asia/download?filename=${output_name}`;
        preview.ref.current.pause();
        preview.ref.current.load();
      })
      .catch((error) => console.log("error", error));
  };
  const text2Image = async () => {
    var text = boxSelected.children.ref.current.value;
    console.log(text);
    console.log(preview);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt: text,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

  return await fetch("https://www.netdancetalent.asia/api/text2image", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        console.log(preview.ref.current.src, "\n", res, res["result"]);
        preview.ref.current.src = res["result"];
      })
      .catch((error) => console.log("error", error));
  };

  const handleTransfer = async () => {
    setClick(true);
    console.log(boxSelected);
    console.log(indexTool);

    switch (boxSelected.type) {
      case "Text":
        console.log("case 1");
        if (indexTool == 0) {
          let res = await tts_google();
          console.log(res);
        } else if (indexTool == 1) {
          let res = await text2Image();
        } else {
          alert("not found type");
          console.error("not found type");
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {screen ? (
        <div
          className="fixed left-0 top-0 z-[100] md:w-0 md:h-0 lg:w-0 lg:h-0 animation-[open-popup] transition-[0.25s] overlay_customzie bg-overlay md:bg-transparent lg:bg-transparent w-full h-full"
          ref={parentRef}>
          <Draggable onDrag={(e) => e.stopPropagation()} disabled={!customize}>
            <div className="z-100 max-h-[65%] w-[350px] container_customize scrollar-cus lg:min-h-[350px] md:min-h-[350px] overflow-auto bg-white md:w-[350px] lg:w-[350px] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed lg:top-[20%] md:top-[20%] md:right-0 lg:right-0">
              <div className="bpx-2 w-full">
                <div className="flex items-center justify-between text-lg font-bold pt-2 w-full border-b-2 mb-2 pb-3">
                  {title}
                  {screen && (
                    <XCircle
                      size={28}
                      className="lg:hidden md:hidden cursor-pointer font-bold"
                      onClick={() => handleClosePopup()}
                      onTouchStart={() => handleClosePopup()}
                    />
                  )}
                </div>
                <Dropdownlist
                  title="Tools"
                  options={tools.map((v) => {
                    return v.title;
                  })}
                  callback={displayToolSelected}
                  selected={indexTool}
                />
                {currentTool}
              </div>
              <div className="flex justify-end my-2">
                {(transfer === "Text" && inputText === true) ||
                (transfer === "Image" && inputImage === true) ||
                (transfer === "Video" && inputVideo === true) ||
                (transfer === "Audio" && inputAudio === true) ||
                (transfer === "Record" && inputRecord === true) ||
                (transfer === "URL" && inputUrl === true) ? (
                  <Button
                    title="Transfer"
                    onClick={() => {
                      handleTransfer();
                      setClick(true);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
              {/* PREVIEW */}
              {clicked && preview}
            </div>
          </Draggable>
        </div>
      ) : (
        <Draggable>
          <div
            className="z-[100] md:hidden lg:hidden fixed top-[50%] right-0 bg-white border-[#3498DB] border p-3 flex items-center justify-center rounded-full"
            onClick={() => setScreen(true)}
            onTouchStart={() => setScreen(true)}>
            <Swap size={32} className="" color="#3498DB" />
          </div>
        </Draggable>
      )}
    </>
  );
}
export default Customize;
