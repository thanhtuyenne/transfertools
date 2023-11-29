import MediaBase from "./MediaBase";
import { GooglePodcastsLogo, Hammer, Image as I, LinkSimple, Microphone, TextT, VideoCamera } from "@phosphor-icons/react/dist/ssr";

export const Audio = () => {
    const acceptType = ".mp3, .raw, .wav";
    return (
        <MediaBase IconComp={GooglePodcastsLogo} placeholder="Upload your Audio" accept={acceptType} />
    );
}

export const Image = () => {
    const acceptType = ".jpg, .png, .jpeg";
    return (
        <MediaBase
            IconComp={I}
            placeholder="Upload your Image"
            accept={acceptType} />
    );
}

export const Video = () => {
    const acceptType = "video/mp4";
    return (
        <MediaBase IconComp={VideoCamera} placeholder="Upload your video" accept={acceptType} />
    );
}