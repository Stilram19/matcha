import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FaBars } from "react-icons/fa6";


export default function GuestHeader() {
    const [isHidden, setHidden] = useState(true);
    const wrapper = useOutsideClick(() => setHidden(true));

    const handleOnClick = () => {
        setHidden((prev) => !prev);
    }

    return (
        <nav className="h-[74px] flex   w-screen z-10 bg-white">
            <div className="hidden md:flex items-center justify-between shadow px-10 w-full">
                <div className="flex gap-16">
                    <Link to="/"><img src="/matcha_logo.svg" width={116} height={74} /></Link>
                    <ul className="flex items-center list-none">
                        <li><NavLink to="/" className="p-5 hover:text-pastel-pink">home</NavLink></li>
                        <li><NavLink to="#" className="p-5 hover:text-pastel-pink">about</NavLink></li>
                        <li><NavLink to="#" className="p-5 hover:text-pastel-pink">why us</NavLink></li>
                    </ul>
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider hover:text-pastel-pink">login</Link>
                    <Link to="/signup" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider bg-pink text-white hover:text-pastel-pink">sign up</Link>
                </div>
            </div>

            {/* Phone version */}
            <div className="px-3 w-full flex justify-between shadow md:hidden">
                <Link to="/"><img src="/matcha_logo.svg" width={116} height={74} /></Link>
                <div ref={wrapper} className="flex">
                    {/* <button onClick={handleOnClick}><RxHamburgerMenu size={40} /></button> */}
                    <button onClick={handleOnClick}><FaBars size={25} className="hover:fill-pastel-pink" /></button>

                {/* <div><i className="scale-125 p-2 sm:scale-150 fa-sharp fa-solid fa-bars p-7"></i></div> */}
    
                    <div className={`py-2 absolute top-[74px] left-0 w-full bg-gray-200 ${isHidden ? 'hidden' : ''}`}>
                        <ul className='w-full flex flex-col items-center justify-center list-none'>
                            <li onClick={handleOnClick} className="w-full"><NavLink to="/" className="w-full text-center block p-2 hover:text-pastel-pink hover:bg-gray-300 text-lg">home</NavLink></li>
                            <li onClick={handleOnClick} className="w-full"><NavLink to="#" className="w-full text-center block p-2 hover:text-pastel-pink hover:bg-gray-300 text-lg">about</NavLink></li>
                            <li onClick={handleOnClick} className="w-full"><NavLink to="#" className="w-full text-center block p-2 hover:text-pastel-pink hover:bg-gray-300 text-lg">why us</NavLink></li>
                        </ul>
                        <div className="flex justify-center gap-4">
                            <Link to="/login" onClick={handleOnClick} className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider hover:text-pastel-pink">login</Link>
                            <Link to="/signup" onClick={handleOnClick} className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider bg-pink text-white hover:text-pastel-pink">sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

} 