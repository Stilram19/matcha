import { Link, NavLink } from "react-router-dom";
import './style.css'

function LoggedInHeader() {
    return (
        <div className="flex justify-between shadow bg-white pl-2 pr-7 xl:pl-52 xl:pr-40">
            <div className="flex gap-12">
                <div className="">
                    <Link to='/'><img src="/matcha_logo.svg" alt="logo" className="ml-10" width={116} height={74}/></Link>
                </div>
                <div className="flex w-209px mt-3 h-48px search-bar-bg round-7px">
                    <img src="/icons/search-icon.svg" alt='search-icon' className="w-5 h-5 m-3"/>
                    <input className="bg-transparent mb-1 w-133px" type="text" placeholder="Search..."></input>
                    <img src="/icons/cross-icon.svg" alt='cross-icon' className="w-22px"/>
                </div>
            </div>
            <nav className="flex gap-6">
                <ul className="flex items-center">
                    <li><NavLink className="p-5" to='/home'>home</NavLink></li>
                    <li><NavLink className="p-5" to='/user-profile'>profile</NavLink></li>
                    <li><NavLink className="p-5" to='/chat'>chat</NavLink></li>
                    <li><NavLink className="p-5" to='/history'>history</NavLink></li>
                </ul>
                <img src="/icons/nav-bar-divider.svg" alt="nav bar divider" className="h-34px mt-5" />
                <div className="flex items-center">
                    <Link to="/notifications" className="p-5"><img src="/icons/notification-bell.svg" alt="notification bell" style={{minWidth: 28}}/></Link>
                    <Link to="/logout" className="p-5">logout</Link>
                </div>
            </nav>
        </div>
    )
};

export default LoggedInHeader;

/* nav bar */

// position: absolute;
// width: 497px;
// height: 34.5px;
// left: 700px;
// top: 20px;
