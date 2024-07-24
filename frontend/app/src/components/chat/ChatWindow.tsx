import ChatBox from "./ChatBox";
import ConversationHeader from "./ConversationHeader";
import { EventsEnum, MessageType, ParticipantUser } from "../../types";
import { Dispatch, SetStateAction, useState } from "react";
// import users from '../../data/users.json' // dummy data , previwing rendering
// import dmMessages from '../../data/messages.json' // dummy data , previwing rendering
import eventObserver from "../../utils/eventObserver";
import { useActiveDm } from "../../context/activeDmProvider";
import { prepareSocketEventRegistration } from "../../utils/socket";
import { useSocketEventRegister } from "../../hooks/useSocketEventResgiter";
import MessagesProvider from "../../context/messagesProvider";



function    getFormattedTime() {
    const   dateNow = new Date();
    const   formattedTime = `${dateNow.getHours()}:${dateNow.getMinutes()}`
    return (formattedTime)
}


function    registerEventHandlers(setMessages: Dispatch<SetStateAction<any[]>>, setParticipant: Dispatch<SetStateAction<ParticipantUser | undefined>>) {
    const   { activeDmId } = useActiveDm();

    const   messageReceivedHandler = (message: any) => {
        console.log(message);
        if (message.from === activeDmId || message.isSender) {
            setMessages((prev) => [...prev, 
                    {isSender: message.isSender , sentAt: getFormattedTime(), messageType: message.messageType, messageContent: message.messageContent}
            ]);
            // !!!!!!!!! emit that the message read
        }
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



const ChatWindow = () => {
    const   [messages, setMessages] = useState<MessageType[]>([]);
    const   [participant, setParticipant] = useState<ParticipantUser>();

    registerEventHandlers(setMessages, setParticipant);
    const   handleFavoriteClick = (conversationId: number) => {
        setParticipant((prev) => {
            if (!prev)
                return ;
            return ({...prev, isFavorite: !prev.isFavorite})
        });
        eventObserver.publish(EventsEnum.APP_FAVORITE_CHANGE, conversationId);
        // ! Post it
    }

    return (
        <MessagesProvider value={{messages, setMessages}}>
            <div className="w-full h-full flex flex-col">
                {/* normally the passed user will be the participant in user in the conversation */}
                {participant && 
                    <ConversationHeader {...participant} onClick={handleFavoriteClick} /> }
                <ChatBox/>
            </div>
        </MessagesProvider>
    )
}




export default ChatWindow;