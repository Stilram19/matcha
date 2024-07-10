import { AiOutlineAudio } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { ChatBoxProps, MessageProps } from "../../types";
import Message from "./Message";
import ConversationHeader from "./ConversationHeader";
import useScrollInto from "../../hooks/useScrollInto";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import messages from '../../data/messages.json' // dummy data , previwing rendering
import users from '../../data/users.json'
import { useSocket } from '../../context/SocketProvider';

function    getFormattedTime() {
    const   dateNow = new Date();
    const   formattedTime = `${dateNow.getHours()}:${dateNow.getMinutes()}`
    return (formattedTime)
}


const   ChatInputField: FC<{onSend: (msg: string) => void}> = ({onSend}) => {
    const   inputRef = useRef<HTMLInputElement>(null);

    const   sendHandler = () => {
        if (!inputRef.current)
            return ;

        const   msg = inputRef.current.value;
        if (msg === '') return;
        onSend(msg);
        inputRef.current.value = '';
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            sendHandler();
    }

    return (
        <div className="relative pt-2">
            <div className="absolute bottom-2 w-full px-3">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your message"
                    className="outline-none border w-full p-3 px-3 pr-20 rounded-lg"
                    onKeyDown={handleKeyDown}
                />
                <div className="absolute bottom-0 top-0 right-5 flex items-center gap-2">
                    <button className="">
                        <AiOutlineAudio size={25} className="fill-gray-500 hover:fill-black" />
                    </button>
                    <button className="p-1 bg-pink rounded-md" onClick={sendHandler}>
                        <IoSend size={25} className="fill-white" />
                    </button>
                </div>
            </div> 
        </div>
    )

} 


const   ChatBox: FC<ChatBoxProps> = ({dmId}) => {
    const   [dmMessages, setMessages] = useState(messages)
    const   lastMessageRef = useScrollInto(dmMessages);
    const   user = users[dmId];
    const   socket = useSocket();

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollTop === 0)
            console.log("Top");
        // Fetching more messages
    }
    console.log(dmId);



    const receiveMessage = (message: any) => {
        if (message.from === dmId)
            setMessages((prev) => [...prev, {isSender: false, sentAt: getFormattedTime(), message: message.message}])
    }

    const   onSendHandler = (message: string) => {
        const   sentAt = getFormattedTime();
        const   messageDetails: MessageProps = {isSender: true, message, sentAt};

        socket?.emit('chat:send', {to: dmId, message});
        console.log(message);
        setMessages((prev) => [...prev, messageDetails])
    }

    useEffect(() => {
        socket?.on('chat:message', receiveMessage)

        return () => {
            console.log("unmount ChatBox");
            socket?.removeListener('chat:message', receiveMessage)
        };
    }, [socket])

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
                            dmMessages.map((message, index, arr) => {
                                return (
                                    <div key={index} className={`mr-1 my-2 md:my-3 lg:my-5 ${(index > 0 && arr[index-1].isSender != arr[index].isSender ? 'mt-5 md:mt-7 lg:mt-10' : '')} ${index == dmMessages.length - 1 ? 'mb-5' : ''}`}>
                                        <Message  {...message}  />
                                    </div>
                                )
                            })
                        }
                        <div ref={lastMessageRef} />
                    </div>
            </div>

            <ChatInputField onSend={onSendHandler} />
    
        </div>
    )
}


export default ChatBox;