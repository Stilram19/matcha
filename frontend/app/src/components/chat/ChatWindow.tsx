import ChatBox from "./ChatBox";
import ConversationHeader from "./ConversationHeader";
import { EventsEnum, MessageType, ParticipantUser } from "../../types";
import { Dispatch, SetStateAction } from "react";
import eventObserver from "../../utils/eventObserver";
import { useActiveDm } from "../../context/activeDmProvider";
import { prepareSocketEventRegistration } from "../../utils/socket";
import { useSocketEventRegister } from "../../hooks/useSocketEventResgiter";
import MessagesProvider from "../../context/messagesProvider";
import useFetch from "../../hooks/useFetch";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";

// function   

type ChatIncomingPayload = {from: number} & MessageType;


function    registerEventHandlers(setMessages: Dispatch<SetStateAction<any[] | undefined>>, setParticipant: Dispatch<SetStateAction<ParticipantUser | undefined>>) {
    const   { activeDmId } = useActiveDm();

    const   messageReceivedHandler = (message: ChatIncomingPayload) => {
        console.log(message);

        if (message.from === activeDmId || message.isSender) {
            setMessages((prev) => {
                if (!prev)
                    return (prev);
                return [
                    {
                        id: message.messageId,
                        isSender: message.isSender,
                        sentAt: message.sentAt,
                        messageType: message.messageType,
                        messageContent: message.messageContent
                    },
                    ...prev 
                ]
            });
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
    const   {activeDmId} = useActiveDm();
    const   messages = usePaginatedFetch<MessageType>(`${import.meta.env.VITE_LOCAL_CHAT_DMS}/${activeDmId}`);
    const   [participant, setParticipant] = useFetch<ParticipantUser>(`${import.meta.env.VITE_LOCAL_CHAT_DM_PARTICIPANT}/${activeDmId}`);
    // const   [participant, setParticipant] = useState<ParticipantUser>();

    registerEventHandlers(messages.setData, setParticipant);
    const   handleFavoriteClick = (conversationId: number) => {
        setParticipant((prev) => {
            if (!prev)
                return ;
            return ({...prev, isFavorite: !prev.isFavorite})
        });
        eventObserver.publish(EventsEnum.APP_FAVORITE_CHANGE, conversationId);
        // ! Patch it
    }

    const   reversed_data = [...(messages.data || [])];
    reversed_data.reverse();

    console.log(reversed_data);

    return (
        <MessagesProvider
            value={
                {
                    messages: reversed_data,
                    setMessages: messages.setData,
                    fetchMoreMessages: messages.fetchMoreData,
                    hasMore: messages.hasMore
                }
            }
        >
            <div className="w-full h-full flex flex-col">
                {/* normally the passed user will be the participant in user in the conversation */}
                {participant && 
                    <ConversationHeader {...participant} onClick={handleFavoriteClick} /> }
                <ChatBox key={activeDmId}/>
            </div>
        </MessagesProvider>
    )
}




export default ChatWindow;