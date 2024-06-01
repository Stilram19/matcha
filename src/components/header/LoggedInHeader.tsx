import { Link, NavLink } from "react-router-dom";
import './style.css'

function LoggedInHeader() {
    return (
        <div className="flex justify-between shadow bg-white lg:pl-10 lg:pr-10 xl:pl-36 xl:pr-36 2xl:pl-44 2xl:pr-44">
            <div className="flex gap-3 lg:gap-12">
                <div className="">
                    <Link to='/'><img src="/matcha_logo.svg" alt="logo" className="scale-90 lg:scale-100" width={116} height={74} style={{minWidth: 116, minHeight: 74}}/></Link>
                </div>
                <div className="hidden md:inline-flex flex mt-3 w-52 h-12 search-bar-bg round-7px">
                    <img src="/icons/search-icon.svg" alt='search-icon' className="w-5 h-5 m-3"/>
                    <input className="bg-transparent mb-1 w-131px" type="text" placeholder="Search..."></input>
                    <img src="/icons/cross-icon.svg" alt='cross-icon' className="w-22px"/>
                </div>
            </div>
            <nav className="hidden md:inline-flex flex gap-4 lg:gap-6">
                <ul className="flex items-center">
                    <li><NavLink className="p-3 lg:p-5 hover:text-pastel-pink" to='/home'>home</NavLink></li>
                    <li><NavLink className="p-3 lg:p-5 hover:text-pastel-pink" to='/user-profile'>profile</NavLink></li>
                    <li><NavLink className="p-3 lg:p-5 hover:text-pastel-pink" to='/chat'>chat</NavLink></li>
                    <li><NavLink className="p-3 lg:p-5 hover:text-pastel-pink" to='/history'>history</NavLink></li>
                </ul>
                <img src="/icons/nav-bar-divider.svg" alt="nav bar divider" className="h-34px mt-5" />
                <div className="flex items-center">
                    <Link to="/notifications" className="p-3 lg:p-5"><img src="/icons/notification-bell.svg" alt="notification bell" style={{minWidth: 28}}/></Link>
                    <Link to="/logout" className="p-3 lg:p-5 hover:text-pastel-pink">logout</Link>
                </div>
            </nav>
            <div className="md:hidden"><i className="fa-sharp fa-solid fa-bars p-7"></i></div>
        </div>
    )
};

export default LoggedInHeader;

