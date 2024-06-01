import ChatBox from "../../components/chat/ChatBox";
import ChatList from "../../components/chat/ChatList";
import ContactInfo from "../../components/chat/ContactInfo";
import messages from './messages.json'
import dms from "./data.json"


const Chat = () => {


    return (
        // pt-[80px]
        <div className="flex justify-around w-screen h-[calc(100vh-80px)]">
            <div className="w-[90%] m-5 border border-e0 rounded-xl shadow-md flex">
                <div className="w-1/4 h-full border-r">
                    <ChatList dms={dms} />
                </div>
            
                <div className="md:w-1/2 w-3/4 h-full md:border-r">
                    <ChatBox messages={messages} />
                </div>

                <div className="hidden md:flex w-1/4 h-full">
                    <ContactInfo />
                </div>
            </div>
        </div>
    )
}


export  default Chat;