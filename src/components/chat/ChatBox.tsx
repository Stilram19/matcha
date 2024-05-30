import { AiOutlineAudio } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { useEffect, useRef } from "react";
import Message from "./Message";
import messages from "./messages.json"
import RecipiantBar from "./RecipiantView";



const   ChatBox = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className="w-full h-full flex flex-col">

            <RecipiantBar />

            <div className="h-full w-full p-2 pr-0 overflow-hidden">
                <div className="relative w-full h-full">
                    <div className="h-[92%] overflow-y-auto scrollbar mr-1">
                        {
                            messages.map((message, index, arr) => {
                                return (
                                    <div key={index} ref={index == messages.length - 1 ? messagesEndRef : null} className={`mr-1 my-5 ${(index > 0 && arr[index-1].isSender != arr[index].isSender ? 'mt-10' : '')} ${index == messages.length - 1 ? 'mb-16' : ''}`}>
                                        <Message  {...message}  />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="absolute bottom-3 w-full">
                        <input
                            type="text"
                            placeholder="Enter your message"
                            className="outline-none border w-full p-3 px-3 pr-20 rounded-lg"
                        />
                        <div className="absolute bottom-0 top-0 right-4 flex items-center gap-2">
                            <button className="">
                                <AiOutlineAudio size={25} className="fill-gray-500 hover:fill-black" />
                            </button>
                            <button className="p-1 bg-pink rounded-md">
                                <IoSend size={25} className="fill-white" />
                            </button>
                        </div>
                    </div> 
                </div>
            </div>

        </div>
    )
}


export default ChatBox;