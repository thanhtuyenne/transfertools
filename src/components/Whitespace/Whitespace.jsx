// import { Repeat } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dontClickInput } from "../../redux/clickSlice";
import { dontClickFile } from "../../redux/fileSlice";
import Element from "./Element";
import Customize from "../Customize/Customize";
import ToSpeech from "../Customize/ToSpeech";

function Whitespace(props) {
  const dispatch = useDispatch();
  const [update2, setUpdate2] = useState(0);
  const [isOpenCustomize, setisOpenCustomize] = useState(false);
  const [DataOpenCustomize, setDataOpenCustomize] = useState({
    title: "",
    tools: [],
  });
  // const [selected, setSelected] = useState();
  const handleOpenCustomize = (typeModel) => {
    setisOpenCustomize(true);
    setDataOpenCustomize((data) => {
      console.log(typeModel);
      data.title = typeModel;

      switch (typeModel) {
        case "Text":
          data.tools = [
            {
              title: "Text to speech",
              comp: <ToSpeech />,
            },
            {
              title: "Text to image",
              comp: <></>,
            },
          ];
          break;
        case "Image":
          data.tools = [
            {
              title: "Image to text",
              comp: <></>,
            },
            {
              title: "Image to ...",
              comp: <></>,
            },
          ];
          break;
        case "Video":
          data.tools = [
            {
              title: "Video to text",
              comp: <></>,
            },
            {
              title: "Video to ...",
              comp: <></>,
            },
          ];
          break;
        case "Audio":
          data.tools = [
            {
              title: "Audio to text",
              comp: <></>,
            },
            {
              title: "Audio to ...",
              comp: <></>,
            },
          ];
          break;
        case "URL":
          data.tools = [
            {
              title: "URL to ...",
              comp: <></>,
            },
          ];
          break;
        case "Record":
          data.tools = [
            {
              title: "Record to text",
              comp: <></>,
            },
            {
              title: "Record to ...",
              comp: <></>,
            },
          ];
          break;
        default:
          break;
      }
      return data;
    });
  };
  const renderedElements = props.data?.map((typeBlock) => (
    <>
      {typeBlock.list?.length > 0 &&
        typeBlock.list?.map((element, index) => (
          <Element
            type={element.type}
            key={index}
            coor={element}
            updateCoors={props.updateElement}
            openCustomize={handleOpenCustomize}
          />
        ))}
    </>
  ));
  useEffect(() => {
    setUpdate2((prev) => prev + 1);
  }, [props.update]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        props.data?.map((typeBlock, idx1) => {
          typeBlock.list?.map((item, idx2) => {
            if (item.isSelected) {
              // console.log("check:", item,idx1,idx2)
              removeElement(idx1, idx2);
              dispatch(dontClickInput());
              dispatch(dontClickFile());
            }
          });
        });
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          props.data?.map((typeBlock, idx1) => {
            typeBlock.list?.map((item, idx2) => {
              if (item.isSelected) {
                removeElement(idx1, idx2);
                dispatch(dontClickInput());
                dispatch(dontClickFile());
              }
            });
          });
        }
      });
    };
  }, [props.data]);

  const removeElement = (idx1, idx2) => {
    var data = props.data;
    data[idx1]?.list?.splice(idx2, 1);
    props.setData(data);
  };

  return (
    <div className="w-full bg-repeat whitespace overflow-hidden" id="boxDrop">
      <div
        className="w-full"
        style={{
          backgroundColor: "rgba(255,255,255,.6)",
          height: "100vh",
        }}
      >
        {isOpenCustomize && (
          <Customize
            title={DataOpenCustomize.title}
            tools={DataOpenCustomize.tools}
          />
        )}
        {renderedElements}
      </div>
    </div>
  );
}

export default Whitespace;
