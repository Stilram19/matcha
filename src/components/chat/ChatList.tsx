import { AiFillMessage } from "react-icons/ai";
import { FaHeart, FaUserFriends } from "react-icons/fa";
import { MessageBarProps } from "../../types";
import { ChatListProps } from "../../types/ChatListProps";
import { FC } from "react";

const   MessageBar = (props: MessageBarProps) => {

    return (
        <div className="w-full p-1 h-20 flex items-center gap-2  hover:bg-gray-200 cursor-pointer">
            <img src={props.profile_image} alt="Profile" className="min-w-16 max-w-16 min-h-16 max-h-16 rounded-full object-cover" />
            <div className="flex flex-col overflow-hidden">
                <h1 className="text-xl truncate">
                    {props.full_name}
                </h1>
                <p className="text-gray-500 truncate">
                    {props.last_message}
                </p>
            </div>
        </div>
    )
}


const   ChatList: FC<ChatListProps> = ({dms}) => {
    return (
        <div className="w-full h-full pb-1">
            <div className="p-2 mb-2">
                <div className="flex justify-between items-center mb-1">
                    <h1 className="text-lg font-semibold">Chats</h1>
                    <div className="flex gap-2">
                        <AiFillMessage
                            size={22}
                            className="fill-pink cursor-pointer hover:fill-pink"
                        />
                        <FaHeart
                            size={22}
                            className="cursor-pointer hover:fill-pink"
                        />
                        <FaUserFriends
                            size={22}
                            className="cursor-pointer hover:fill-pink"
                        />
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-0 bottom-0 ps-3 flex items-center">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="search Chats"
                        className="w-full outline-none p-2 border border-e0 placeholder:text-lg rounded-lg ps-10" />
                </div>
            </div>

            <div className="flex flex-col max-h-[calc(100%-100px)] overflow-y-auto scrollbar">

                {dms.map((dm, index) => {
                    return <MessageBar key={index} {...dm}/>
                })}

            </div>


        </div>
    )
}


export default ChatList;