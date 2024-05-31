import ChatBox from "../../components/chat/ChatBox";
import ChatList from "../../components/chat/ChatList";
import ContactInfo from "../../components/chat/ContactInfo";
import messages from './messages.json'
import dms from "./data.json"


const Chat = () => {


    return (
        <div className="md:pt-[80px] flex justify-around w-screen h-screen">
            <div className="w-[90%] m-5 border border-e0 rounded-xl shadow-md flex">
                <div className="w-1/4 h-full border-r">
                    <ChatList dms={dms} />
                </div>
            
                <div className="w-1/2 h-full border-r">
                    <ChatBox messages={messages} />
                </div>

                <div className="w-1/4 h-full">
                    <ContactInfo />
                </div>
            </div>
        </div>
    )
}


export  default Chat;