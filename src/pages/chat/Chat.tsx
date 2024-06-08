import ChatBox from "../../components/chat/ChatBox";
import ChatList from "../../components/chat/ChatList";
import ContactInfo from "../../components/chat/ContactInfo";
// import messages from './messages.json'
import dms from "../../data/data.json"
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";


const Chat = () => {
    const [activeDmId, setActiveDmId] = useState(-1);

    const isDmActive = activeDmId !== -1;

    return (
        // pt-[80px]
        <div className="flex justify-around w-screen h-[calc(100vh-80px)]">
            <div className="w-[90%] m-5 border border-e0 rounded-xl shadow-md flex">
                <div className={`w-full ${isDmActive ? "hidden" : ''} md:inline-block md:w-1/4 h-full border-r`}>
                    {/* onClick event attached to every single dm Bar */}
                    <ChatList dms={dms} onClick={(id) => setActiveDmId(id)}/> 
                </div>
            
                <div className={`md:inline-block relative ${isDmActive ? 'inline-block w-full' : 'hidden'} md:w-1/2 h-full md:border-r`}>
                    {isDmActive && (
                            <>
                                <span className="md:hidden absolute top-7 cursor-pointer" onClick={() => setActiveDmId(-1)}>
                                    <FaArrowLeft className="hover:fill-slate-400" size={20} />
                                </span>
                                <ChatBox dmId={activeDmId} />
                            </>
                        )}
                </div>

                <div className="hidden md:flex w-1/4 h-full">
                    { isDmActive ? <ContactInfo  /> : null }
                </div>
            </div>
        </div>
    )
}


export  default Chat;