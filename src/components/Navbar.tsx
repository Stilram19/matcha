

export default function Navbar() {


    return (
        <nav className="h-[74px] flex items-center justify-between shadow px-10">
            <div className="flex gap-16">
                <a href="#"><img src="/matcha_logo.png" width={116} height={74} /></a>
                <ul className="flex items-center list-none">
                    <li><a href="#" className="p-5 hover:text-pastel-pink">home</a></li>
                    <li><a href="#" className="p-5 hover:text-pastel-pink">about</a></li>
                    <li><a href="#" className="p-5 hover:text-pastel-pink">why us</a></li>
                </ul>
            </div>
            <div className="flex gap-4">
                <a href="#" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider hover:text-pastel-pink">login</a>
                <a href="#" className="px-4 bg-light-gray py-2 font-semibold rounded-lg tracking-wider bg-pink text-white hover:text-pastel-pink">sign up</a>
            </div>
        </nav>
    )

} 