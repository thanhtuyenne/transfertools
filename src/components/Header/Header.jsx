import { Bell } from '@phosphor-icons/react/dist/ssr';
import './header.css'

const Header =()=>{
    return (
        <div className="headerTrans">
            <button className="btn-notification"><Bell size={32} /></button>
            <div className="btn-save"><span>SAVE</span></div>
        </div>
    )
}

export default Header;