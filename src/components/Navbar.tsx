import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";


export default function Navbar() {
    const [isHidden, setHidden] = useState(true);

    
    const handleOnClick = () => {
        setHidden((prev) => !prev);
    }

    return (
        <nav className="h-[74px] flex  fixed top-0 w-screen z-10 bg-white">
            <div className="hidden md:flex items-center justify-between shadow px-10 w-full">
                <div className="flex gap-16">
                    <Link to="/"><img src="/matcha_logo.png" width={116} height={74} /></Link>
                    <ul className="flex items-center list-none">
                        <li><Link to="/" className="p-5 hover:text-pastel-pink">home</Link></li>
                        <li><Link to="#" className="p-5 hover:text-pastel-pink">about</Link></li>
                        <li><Link to="#" className="p-5 hover:text-pastel-pink">why us</Link></li>
                    </ul>
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider hover:text-pastel-pink">login</Link>
                    <Link to="/signup" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider bg-pink text-white hover:text-pastel-pink">sign up</Link>
                </div>
            </div>
            <div className="px-3 w-full flex justify-between md:hidden">
                <Link to="/"><img src="/matcha_logo.png" width={116} height={74} /></Link>
                <button onClick={handleOnClick}><RxHamburgerMenu size={40} /></button>
                <div className={`absolute top-[74px] left-0 w-full bg-gray-200 ${isHidden ? 'hidden' : ''}`}>
                    <ul className='w-full flex flex-col items-center justify-center list-none'>
                        <li><Link to="/" className="w-full block p-2 hover:text-pastel-pink hover:bg-gray-300 text-lg">home</Link></li>
                        <li><Link to="#" className="w-full block p-2 hover:text-pastel-pink hover:bg-gray-300 text-lg">about</Link></li>
                        <li><Link to="#" className="w-full block p-2 hover:text-pastel-pink hover:bg-gray-300 text-lg">why us</Link></li>
                    </ul>
                    <div className="flex justify-center gap-4">
                        <Link to="/login" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider hover:text-pastel-pink">login</Link>
                        <Link to="/signup" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider bg-pink text-white hover:text-pastel-pink">sign up</Link>
                    </div>
                </div>
            </div>
        </nav>
    )

} 