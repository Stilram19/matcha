import ChatBox from "../../components/chat/ChatBox";
import ChatList from "../../components/chat/ChatList";
import ContactInfo from "../../components/chat/ContactInfo";
// import messages from './messages.json'
import dms from "./data.json"
import { useState } from "react";


const Chat = () => {
    const [dmId, setDmId] = useState(-1);

    return (
        // pt-[80px]
        <div className="flex justify-around w-screen h-[calc(100vh-80px)]">
            <div className="w-[90%] m-5 border border-e0 rounded-xl shadow-md flex">
                <div className="w-1/4 h-full border-r">
                    {/* onClick event attached to every single dm Bar */}
                    <ChatList dms={dms} onClick={(id) => setDmId(id)}/> 
                </div>
            
                <div className="md:w-1/2 w-3/4 h-full md:border-r">
                    {
                        dmId != -1 ? <ChatBox dmId={dmId} /> : null
                    }
                </div>

                <div className="hidden md:flex w-1/4 h-full">
                    {
                        dmId != -1 ? <ContactInfo  /> : null
                    }
                </div>
            </div>
        </div>
    )
}


export  default Chat;