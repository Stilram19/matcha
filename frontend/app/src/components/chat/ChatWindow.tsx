import ChatBox from "./ChatBox";
import ConversationHeader from "./ConversationHeader";
import { useSocket } from "../../context/SocketProvider";
import { EventsEnum, MessageProps, ParticipantUser, PresenceType } from "../../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import users from '../../data/users.json' // dummy data , previwing rendering
import dmMessages from '../../data/messages.json' // dummy data , previwing rendering
import eventObserver from "../../utils/eventObserver";
import { useActiveDm } from "../../context/activeDmProvider";
import { prepareSocketEventRegistration } from "../../utils/socket";
import { useSocketEventRegister } from "../../hooks/useSocketEventResgiter";



function    getFormattedTime() {
    const   dateNow = new Date();
    const   formattedTime = `${dateNow.getHours()}:${dateNow.getMinutes()}`
    return (formattedTime)
}


function    registerEventHandlers(setMessages: Dispatch<SetStateAction<any[]>>, setParticipant: Dispatch<SetStateAction<ParticipantUser>>) {
    const   { activeDmId } = useActiveDm();

    const   messageReceivedHandler = (message: any) => {
        console.log(message);
        if (message.from === activeDmId) {
            setMessages((prev) => [...prev, {isSender: false, sentAt: getFormattedTime(), message: message.message}]);
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




const   ChatWindow = () => {
    const   socket = useSocket();
    const   { activeDmId } = useActiveDm();
    const   [messages, setMessages] = useState<any[]>(dmMessages);
    const   [participant, setParticipant] = useState<ParticipantUser>({
        id: activeDmId as number,
        firstName: users[activeDmId - 1].firstName,
        lastName: users[activeDmId - 1].lastName,
        isFavorite: users[activeDmId - 1].isFavorite,
        status: users[activeDmId - 1].status as PresenceType,
        profilePicture: users[activeDmId - 1].profilePicture
    });



    const   onSendHandler = (message: string) => {
        const   sentAt = getFormattedTime();
        const   messageDetails: MessageProps = {isSender: true, message, sentAt};

        socket?.emit('chat:send', {to: activeDmId, message});
        setMessages((prev) => [...prev, messageDetails])
        // ! i should re-order the DmList (another reason to add a state management)
        eventObserver.publish(EventsEnum.APP_SEND_MESSAGE, {to: activeDmId, message})
        // if the user send a message then the window should scroll down
    }

    registerEventHandlers(setMessages, setParticipant);
    // instead of using this, integrate the same method as in useFetchAllDms
    // using useSocketEventRegiester hook
    useEffect(() => {

        setParticipant({id: activeDmId as number,
            firstName: users[activeDmId - 1].firstName,
            lastName: users[activeDmId - 1].lastName,
            isFavorite: users[activeDmId - 1].isFavorite,
            status: users[activeDmId - 1].status as PresenceType,
            profilePicture: users[activeDmId - 1].profilePicture
        })

        return () => {
            console.log("unmount ChatBox");
        };
    }, [socket, activeDmId]) // the dmId dependency necessary for re-register the receiveMessage callback


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
            <ChatBox messages={messages} onSend={onSendHandler} />
        </div>
    )

}


export default ChatWindow;