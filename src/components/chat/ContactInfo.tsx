import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHeartDislikeSharp, IoVolumeMute } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";


const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(true);


    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDropdown = () => {
        setIsOpen((prev) => !prev);
    }
    
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target))
            setIsOpen(true)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="self-end relative w-[150px] z-20">
                    <div className="absolute right-0">
                        <button onClick={handleDropdown}>
                            <BsThreeDotsVertical size={20} className="hover:fill-gray-600" />
                        </button>
                    </div>
                    {!isOpen && 
                    <div className='absolute right-5 w-full shadow-lg bg-white border rounded-lg overflow-hidden'>
                        {/* <button className="w-full">block</button> */}
                        <button className="p-1 w-full border-b hover:bg-gray-100 flex justify-center items-center gap-1">
                            <MdBlockFlipped size={15} className="fill-gray-600"/>
                            <p className="text-gray-600">Block</p>
                        </button>
                        <button className="p-1 w-full border-b hover:bg-gray-100 flex justify-center items-center gap-1">
                            <IoVolumeMute size={15} className="fill-gray-600"/>
                            <p className="text-gray-600">Mute</p>
                        </button>
                        <button className="p-1 w-full border-b hover:bg-gray-100 flex justify-center items-center gap-1">
                            <IoHeartDislikeSharp size={15} className="fill-gray-600"/>
                            <p className="text-gray-600">Unlike</p>
                        </button>
                        <button className="p-1 w-full hover:bg-gray-100 flex justify-center items-center gap-1">
                            <FaRegUserCircle size={15} className="fill-gray-600"/>
                            <p className="text-gray-600">Profile</p>
                        </button>
                    </div> }
                </div>
    )
}

const ContactInfo = () => {
    return (
        <div className="p-2 w-full h-full overflow-y-auto scrollbar">
            <div className="flex flex-col items-center">
                <Dropdown />

                <img src='/imgs/man_placeholder.jpg' className=" h-40 w-40 object-cover rounded-full p-1 bg-pink" />
                <h1 className="text-xl">Hellis steve</h1>
                <p className="text-green-700 mb-3">online</p>
                <a href="#" className="w-[80%] bg-black text-white p-2 rounded-lg hover:text-pink text-center">View Profile</a>
                <span className="border my-4 w-full" />
                <div className="self-start flex flex-col items-start mb-4">
                    <h1 className="text-xl font-semibold tracking-wide">username</h1>
                    <p>@hellena_hellis</p>
                </div>
                <div className="self-start flex flex-col items-start">
                    <h1 className="text-xl font-semibold tracking-wide">Biography</h1>
                    <p>Sed tempor purus eu nibh tempor iaculis. Aenean accumsan, orci at maximus euismod, est nisi blandit nibh, 😆</p>
                </div>
            </div>
     </div>
    )
}


export default ContactInfo;