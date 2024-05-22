import { useEffect, useRef } from "react";
import ChatList from "../../components/chat/ChatList";
import { LuHeart } from "react-icons/lu";


const Chat = () => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className="md:pt-[80px] flex justify-around w-screen h-screen">
            <div className="w-full m-5 border border-e0 rounded-xl shadow-md flex">
                <div className="w-1/4 h-full border-r">
                    <ChatList />
                </div>
            
                <div className="w-1/2 border-r">
                    <div className="w-full h-full">
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

                        {/* <div className="h-full w-full pl-3">
                            <div className="h-[83%] overflow-y-auto scrollbar">
                                messages
                                messages<br/>
                                messages<br/>
                                messages<br/>
                                messages<br/>
                                messages<br  ref={messagesEndRef} />
                            </div> */}

                            {/* <div className="absolute bottom-5 border w-[calc(100%-24px)] p-2 px-3 bg-white">
                                <input
                                    type="text"
                                    placeholder="Your message"
                                    className="outline-none"
                                />
                            </div> 
                        </div>*/}

                    </div>
                </div>

            </div>
        </div>
    )
}


export  default Chat;