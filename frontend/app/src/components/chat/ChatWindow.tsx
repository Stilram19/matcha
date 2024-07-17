import ChatBox from "./ChatBox";
import { IoSend } from "react-icons/io5";
import { AiOutlineAudio } from "react-icons/ai";
import ConversationHeader from "./ConversationHeader";
import { useSocket } from "../../context/SocketProvider";
import { EventsEnum, MessageProps, ParticipantUser, PresenceType } from "../../types";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import users from '../../data/users.json' // dummy data , previwing rendering
import dmMessages from '../../data/messages.json' // dummy data , previwing rendering
import eventObserver from "../../utils/eventObserver";
import { useSelectedDm } from "../../context/ChatSelectedProvider";
import { prepareSocketEventRegistration } from "../../utils/socket";
import { useSocketEventRegister } from "../../hooks/useSocketEventResgiter";



function    getFormattedTime() {
    const   dateNow = new Date();
    const   formattedTime = `${dateNow.getHours()}:${dateNow.getMinutes()}`
    return (formattedTime)
}



const   ChatInputField: FC<{onSend: (msg: string) => void}> = ({onSend}) => {
    const   activeDmId = useSelectedDm();
    const   inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, [activeDmId]) // ! it depend on the active conversation id

    const   sendHandler = () => {
        if (!inputRef.current)
            return ;

        const   msg = inputRef.current.value;
        if (msg === '') return;
        onSend(msg);
        inputRef.current.value = '';
    }

    return (
        <div className="relative pt-2">
            <div className="absolute bottom-2 w-full px-3">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your message"
                    className="outline-none border w-full p-3 px-3 pr-20 rounded-lg"
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendHandler()}
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



function    registerEventHandlers(setMessages: React.Dispatch<React.SetStateAction<any[]>>, setParticipant: React.Dispatch<React.SetStateAction<ParticipantUser>>) {
    const   activeDmId = useSelectedDm();

    const   messageReceivedHandler = (message: any) => {
        console.log(message);
        if (message.from === activeDmId)
            setMessages((prev) => [...prev, {isSender: false, sentAt: getFormattedTime(), message: message.message}])
    }

    const selectedConversationPresenceHandler = (onlineUsers: number[]) => {
        const status = onlineUsers.indexOf(activeDmId) !== -1 ? 'online' : 'offline';
        setParticipant((prev) => {
            if (!prev || status === prev.status)
                return (prev);
            return {...prev, status}
        })
    }

    const   registrarFunction = prepareSocketEventRegistration([
            [EventsEnum.CHAT_RECEIVE, messageReceivedHandler],
            [EventsEnum.GLOBAL_PRESENCE, selectedConversationPresenceHandler],
        ])

    useSocketEventRegister(registrarFunction, [activeDmId]);
}




const   ChatWindow = () => {
    const   socket = useSocket();
    const   dmId = useSelectedDm();
    const   [messages, setMessages] = useState<any[]>(dmMessages);
    const   [participant, setParticipant] = useState<ParticipantUser>({
        id: dmId as number,
        firstName: users[dmId - 1].firstName,
        lastName: users[dmId - 1].lastName,
        isFavorite: users[dmId - 1].isFavorite,
        status: users[dmId - 1].status as PresenceType,
        profilePicture: users[dmId - 1].profilePicture
    });

    const   onSendHandler = (message: string) => {
        const   sentAt = getFormattedTime();
        const   messageDetails: MessageProps = {isSender: true, message, sentAt};

        socket?.emit('chat:send', {to: dmId, message});
        setMessages((prev) => [...prev, messageDetails])
        // ! i should re-order the DmList (another reason to add a state management)
        eventObserver.publish(EventsEnum.APP_SEND_MESSAGE, {to: dmId, message})
    }

    registerEventHandlers(setMessages, setParticipant);
    // instead of using this, integrate the same method as in useFetchAllDms
    // using useSocketEventRegiester hook
    useEffect(() => {

        setParticipant({id: dmId as number,
            firstName: users[dmId - 1].firstName,
            lastName: users[dmId - 1].lastName,
            isFavorite: users[dmId - 1].isFavorite,
            status: users[dmId - 1].status as PresenceType,
            profilePicture: users[dmId - 1].profilePicture
        })

        return () => {
            console.log("unmount ChatBox");
        };
    }, [socket, dmId]) // the dmId dependency necessary for re-register the receiveMessage callback


    const   handleScrollToTop = () => {
        
    }

    const   handleFavoriteClick = (conversationId: number) => {
        setParticipant((prev) => {return {...prev, isFavorite: !prev.isFavorite}})
        eventObserver.publish(EventsEnum.APP_FAVORITE_CHANGE, conversationId);
    
        // ! post to the API
    }


    return (
        <div className="w-full h-full flex flex-col">
            {/* normally the passed user will be the participant in user in the conversation */}
            <ConversationHeader {...participant} onClick={handleFavoriteClick} />
            <ChatBox messages={messages} />
            <ChatInputField onSend={onSendHandler} />
        </div>
    )

}


export default ChatWindow;