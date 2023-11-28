
import { GooglePodcastsLogo, Hammer, Image, LinkSimple, Microphone, TextT, VideoCamera } from "@phosphor-icons/react/dist/ssr";
// import { useState } from "react";
import Popup from "reactjs-popup";
import ModalOptionTool from "./ModalOptionTools";
import "./navbar.css"
const Navbar = (props) => {
    return (
        <div className="container1">
            <div className="navbar">
                <div className="box_1">
                    <Popup trigger={<button><TextT size={32} /></button>}
                        position="top center"
                    // offsetY={25}
                    // disabled={true}
                    // arrowStyle={
                    //     {
                    //         color: '#CCCCCC',
                    //         width: '30px',
                    //         bottom: 0,
                    //         right: "-10px",
                    //         // border: "1px solid #CCCCCC"
                    //     }
                    // }
                    >

                        {/* <ModalOptionTool /> */}
                    </Popup>

                    {/* <TextT size={32} /> */}

                </div>
                <div className="box_1"><Image size={32} /></div>
                <div className="box_1"><VideoCamera size={32} /></div>
                <div className="box_1"><GooglePodcastsLogo size={32} /></div>
                <div className="box_1"><Microphone size={32} /></div>
                <div className="box_1"><LinkSimple size={32} /></div>
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

