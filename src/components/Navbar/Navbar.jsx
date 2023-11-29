
import { GooglePodcastsLogo, Hammer, Image, LinkSimple, Microphone, TextT, VideoCamera } from "@phosphor-icons/react/dist/ssr";
// import { useState } from "react";
import Popup from "reactjs-popup";
import ModalOptionTool from "./ModalOptionTools";
import "./navbar.css"
const Navbar = (props) => {
    const { setIsOpenInputText, setIsOpenInputURL, setIsOpenInputAudio, setIsOpenInputVideo, setIsOpenInputImage, setIsOpenInputRecor } = props;
    return (
        <div className="container1">
            <div className="navbar">
                <div className="box_1"
                    onClick={() => setIsOpenInputText(true)}
                >
                    <TextT size={32} />

                </div>
                <div className="box_1"
                    onClick={() => setIsOpenInputImage(true)}
                >

                    <Image size={32} />

                </div>
                <div className="box_1"
                    onClick={() => setIsOpenInputVideo(true)}
                >
                    <VideoCamera size={32} /></div>
                <div className="box_1"
                    onClick={() => setIsOpenInputAudio(true)}

                ><GooglePodcastsLogo size={32} /></div>
                <div className="box_1"
                    onClick={() => setIsOpenInputRecor(true)}

                ><Microphone size={32} /></div>
                <div className="box_1"
                    onClick={() => setIsOpenInputURL(true)}

                ><LinkSimple size={32} /></div>
                <div className="box_line"></div>

                <div
                    className="box_1"
                >
                    <Popup trigger={<button><Hammer size={32} /></button>}
                        position="top center"
                        offsetY={25}
                        // disabled={true}
                        arrowStyle={
                            {
                                color: "rgba(0, 0, 0, 0.15)",
                                width: '30px',
                                bottom: 0,
                                right: "-10px",
                                // border: "1px solid #CCCCCC"
                            }
                        }>
                        <ModalOptionTool />
                    </Popup>
                </div>
            </div>
        </div >
    )
}

export default Navbar;

