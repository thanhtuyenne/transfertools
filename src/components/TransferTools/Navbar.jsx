
import { GooglePodcastsLogo, Hammer, Image, LinkSimple, Microphone, TextT, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import Popup from "reactjs-popup";
import ModalOptionTool from "./ModalOptionTools";
import "./navbar.css"
const Navbar = ({ props }) => {
    const [modalTools, setModalTool] = useState(false);
    const handleOpenModalTools = () => {
        setModalTool(true)
    }
    return (
        <div className="container1">
            <div className="navbar">
                <div className="box_1"><TextT size={32} /></div>
                <div className="box_1"><Image size={32} /></div>
                <div className="box_1"><VideoCamera size={32} /></div>
                <div className="box_1"><GooglePodcastsLogo size={32} /></div>
                <div className="box_1"><Microphone size={32} /></div>
                <div className="box_1"><LinkSimple size={32} /></div>
                <div className="box_line"></div>

                <div
                    className="box_1"
                    onClick={() => handleOpenModalTools()}
                >
                    <Popup trigger={<button><Hammer size={32} /></button>} position="top center">
                        <ModalOptionTool />
                    </Popup>
                </div>
            </div>
        </div>
    )
}

export default Navbar;

