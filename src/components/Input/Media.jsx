import MediaBase from "./MediaBase";
import {
  GooglePodcastsLogo,
  Image as I,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";

export const Audio = () => {
  const acceptType = ".mp3, .raw, .wav";
  return (
    <MediaBase
      IconComp={GooglePodcastsLogo}
      placeholder="Upload your Audio"
      accept={acceptType}
      callback={(value) => {
        return (
          <audio controls>
            <source src={value} />
          </audio>
        );
      }}
    />
  );
};

export const Image = () => {
  const acceptType = ".jpg, .png, .jpeg";
  return (
    <MediaBase
      IconComp={I}
      placeholder="Upload your Image"
      accept={acceptType}
      callback={(value) => {
        return <img src={value} className="pointer-events-none"/>;
      }}
    />
  );
};

export const Video = () => {
  const acceptType = "video/mp4, .wav, .mov, .webm";
  return (
    <MediaBase
      IconComp={VideoCamera}
      placeholder="Upload your video"
      accept={acceptType}
      callback={(value) => {
        return (
          <video width="400" height="400" controls autoPlay>
            <source src={value} />
          </video>
        );
      }}
    />
  );
};
