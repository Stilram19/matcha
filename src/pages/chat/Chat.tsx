import { BsThreeDotsVertical } from "react-icons/bs";
import ChatBox from "../../components/chat/ChatBox";
import ChatList from "../../components/chat/ChatList";
import { MdBlockFlipped } from "react-icons/md";
import { IoHeartDislikeSharp, IoVolumeMute } from "react-icons/io5";


const Chat = () => {
    // const [isOpen, setIsOpen] = useState(true);


    // const dropdownRef = useRef(null);

    // const handleDropdown = (e) => {
    //     setIsOpen((prev) => !prev);
    // }
    
    // const handleClickOutside = (e) => {
    //     if (dropdownRef.current && !dropdownRef.current.contains(e.target))
    //         setIsOpen(true)
    // }

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //       document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    return (
        <div className="md:pt-[80px] flex justify-around w-screen h-screen">
            <div className="w-[90%] m-5 border border-e0 rounded-xl shadow-md flex">
                <div className="w-1/4 h-full border-r">
                    <ChatList />
                </div>
            
                <div className="w-1/2 h-full border-r">
                    <ChatBox />
                </div>

                <div className="w-1/4 h-full">
                    {/* <ChatList /> */}

                </div>
            </div>
        </div>
    )
}


export  default Chat;