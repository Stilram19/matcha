import { Link } from "react-router-dom";


export default function Navbar() {


    return (
        <nav className="h-[74px] flex items-center justify-between shadow px-10 fixed top-0 w-screen z-10 bg-white">
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
        </nav>
    )

} 