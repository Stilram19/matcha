import { AiOutlineAudio } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { ChatBoxProps } from "../../types";
import Message from "./Message";
import ConversationHeader from "./ConversationHeader";
import useScrollInto from "../../hooks/useScrollInto";
import { FC } from "react";
import messages from '../../data/messages.json' // dummy data , previwing rendering
import users from '../../data/users.json'



const   ChatBox: FC<ChatBoxProps> = ({dmId}) => {
    const messagesEndRef = useScrollInto();
    const user = users[dmId];

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollTop === 0)
            console.log("Top");
        // Fetching more messages
    }
    console.log(dmId);

    return (
        <div className="w-full h-full flex flex-col">
            <ConversationHeader
                firstName={`${!user ? 'Who am i' : user.firstName}`}
                lastName={`${!user ? 'Who am i' : user.lastName}`}
                profilePicture={user ? user.profilePicture : '/imgs/man_placeholder.jpg'}
                status={user ? user.status as ('online' | 'offline') : 'offline'}
                isFavorite={!user ? false : user.isFavorite}
            />

            <div className="h-full w-full p-2 pr-0 overflow-hidden">
                    <div className="h-[calc(100%-50px)] overflow-y-auto scrollbar mr-1"  onScroll={handleScroll}>
                        {
                            messages.map((message, index, arr) => {
                                return (
                                    <div key={index} ref={index == messages.length - 1 ? messagesEndRef : null} className={`mr-1 my-2 md:my-3 lg:my-5 ${(index > 0 && arr[index-1].isSender != arr[index].isSender ? 'mt-5 md:mt-7 lg:mt-10' : '')} ${index == messages.length - 1 ? 'mb-5' : ''}`}>
                                        <Message  {...message}  />
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>

            <div className="relative pt-2">
                <div className="absolute bottom-2 w-full px-3">
                    <input
                        type="text"
                        placeholder="Enter your message"
                        className="outline-none border w-full p-3 px-3 pr-20 rounded-lg"
                    />
                    <div className="absolute bottom-0 top-0 right-5 flex items-center gap-2">
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
    )
}


export default ChatBox;