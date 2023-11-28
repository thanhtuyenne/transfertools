import './text.css'

import { TextT } from "@phosphor-icons/react/dist/ssr";

const Text =()=>{
    return(
        <div className="text-container">
            <div className="text-logo"><TextT size={40} /></div>
            <input type="text" className="text-input" placeholder="Enter your text"></input>
        </div>
    )
}

export default Text;