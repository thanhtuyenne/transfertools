import MediaBase from "./MediaBase";
import {
  GooglePodcastsLogo,
  Image as I,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { useDispatch, useSelector } from "react-redux";
import { onClickAudio } from "../../redux/clickAudioSlice";
import { onClickImage } from "../../redux/clickImageSlice";
import { onClickVideo } from "../../redux/clickVideoSlice";
import React from "react";

export const Audio = React.forwardRef(function AudioResult(_, ref) {
  const dispatch = useDispatch();
  const acceptType = ["audio/mp3", "audio/raw", "audio/wav"];

  const handleAudioUpload = async (source, filetype) => {
    try {
      const base64data = await blobToBase64(source);
      dispatch(onClickAudio({ source: base64data, filetype: filetype }));
    } catch (error) {
      console.error("Error converting Blob to base64:", error);
      // Xử lý lỗi nếu có
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  return (
    <MediaBase
      IconComp={GooglePodcastsLogo}
      placeholder="Upload your Audio"
      accept={acceptType}
      callback={({ source, filetype }) => {
        handleAudioUpload(source, filetype);

        // Trả về phần tử audio để hiển thị
        return (
          <audio controls className="w-full">
            {/* Sử dụng source trực tiếp */}
            <source
              src={URL.createObjectURL(source)}
              type={filetype}
              ref={ref}
            />
          </audio>
        );
      }}
    />
  );
});

export const Image = React.forwardRef(function ImageResult(_, ref) {
  const dispatch = useDispatch();
  const acceptType = ["jpg", "png", "jpeg"];
  return (
    <MediaBase
      IconComp={I}
      placeholder="Upload your Image"
      accept={acceptType}
      callback={({ source, filetype }) => {
        dispatch(onClickImage({ source: source, filetype: filetype }));
        // dispatch(onClickImage())
        return (
          <img
            src={source}
            type={filetype}
            className="pointer-events-none"
            ref={ref}
          />
        );
      }}
    />
  );
});

export const Video = React.forwardRef(function VideoResult(_, ref) {
  const acceptType = ["mp4", "wav", "mov", "webm"];
  const dispatch = useDispatch();
  return (
    <MediaBase
      IconComp={VideoCamera}
      placeholder="Upload your video"
      accept={acceptType}
      callback={({ source, filetype }) => {
        dispatch(onClickVideo({ source: source, filetype: filetype }));
        return (
          <video width="400" height="400" controls autoPlay>
            <source src={source} type={filetype} ref={ref} />
          </video>
        );
      }}
    />
  );
});
