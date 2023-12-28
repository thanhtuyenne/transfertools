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

export const Audio = () => {
  const selectDataAudio = useSelector((state) => state.clickSelect.data)
  const selectDataIdAudio =  selectDataAudio.id
  const dispatch = useDispatch();
  const acceptType = ["mpeg", "mp3", "raw", "wav"];
  return (
    <MediaBase
      IconComp={GooglePodcastsLogo}
      placeholder="Upload your Audio"
      accept={acceptType}
      callback={({ source, filetype }) => {
        dispatch(onClickAudio({id:selectDataIdAudio, source: source, filetype: filetype }));
        return (
          <audio controls className="w-full">
            <source src={source} type={filetype} />
          </audio>
        );
      }}
    />
  );
};

export const Image = () => {
  const selectDataImage = useSelector((state) => state.clickSelect.data)
  const selectDataIdImage =  selectDataImage.id
  const dispatch = useDispatch();
  const acceptType = ["jpg", "png", "jpeg"];
  return (
    <MediaBase
      IconComp={I}
      placeholder="Upload your Image"
      accept={acceptType}
      callback={({ source, filetype }) => {
        dispatch(onClickImage({id:selectDataIdImage, source: source, filetype: filetype }));
        // dispatch(onClickImage())
        return (
          <img src={source} type={filetype} className="pointer-events-none" />
        );
      }}
    />
  );
};

export const Video = () => {
  const selectDataVideo = useSelector((state) => state.clickSelect.data)
  const selectDataIdVideo =  selectDataVideo.id
  const acceptType = ["mp4", "wav", "mov", "webm"];
  const dispatch = useDispatch();
  return (
    <MediaBase
      IconComp={VideoCamera}
      placeholder="Upload your video"
      accept={acceptType}
      callback={({ source, filetype }) => {
        dispatch(onClickVideo({id: selectDataIdVideo, source: source, filetype: filetype }));
        return (
          <video width="400" height="400" controls autoPlay>
            <source src={source} type={filetype} />
          </video>
        );
      }}
    />
  );
};
