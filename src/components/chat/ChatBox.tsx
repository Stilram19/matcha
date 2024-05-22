import { AiOutlineAudio } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { LuHeart } from "react-icons/lu"
import { useEffect, useRef } from "react";
import Message from "./Message";
import messages from "./messages.json"



const   ChatBox = () => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="border-b h-[80px] w-full flex justify-between items-center py-2 px-5">
                <div className="flex gap-3">
                    <img src="/imgs/man_placeholder.jpg" className="h-16 w-16 object-cover rounded-full"/>
                    <div className="flex flex-col">
                        <h1 className="text-xl">Hellis steve</h1>
                        <p className=" text-green-700">online</p>
                    </div>
                </div>

                <LuHeart title="add to favorites" size={25} className="hover:fill-black cursor-pointer" />
            </div>

            <div className="h-full w-full p-2 pr-0 overflow-hidden">
                <div className="relative w-full h-full">
                    <div className="h-[92%] overflow-y-auto scrollbar">
                        {messages.map((message, index) => <Message key={index} {...message} ref={index == messages.length - 1 ? messagesEndRef : null} />)}
                    </div>

                    <div className="absolute bottom-3 w-full">
                        <input
                            type="text"
                            placeholder="Your message"
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