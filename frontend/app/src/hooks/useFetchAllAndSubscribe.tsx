import { Dispatch, SetStateAction, useEffect } from "react";
import { DmListType, EventsEnum } from "../types";
import useFetch from "./useFetch";
import { changeParticipantPresence, prepareSocketEventRegistration } from "../utils/socket";
import { useSocketEventRegister } from "./useSocketEventResgiter";
import eventObserver from "../utils/eventObserver";
import { useActiveDm } from "../context/activeDmProvider";


// this interface should consistent with data that send by the io server
interface MessageEvent {
    isSender: boolean;
    from: number;
    to: number;
    messageType: 'audio' | 'text';
    messageContent: string | ArrayBuffer;
    firstName: string;
    lastName: string;
    status: 'online' | 'offline';
    isFavorite: boolean;
}

type    StatePair = [DmListType[] | undefined, React.Dispatch<React.SetStateAction<DmListType[] | undefined>>];

type    ReactSetter<T> = Dispatch<SetStateAction<T>>


function formatMessage(messageType: 'text' | 'audio', message: string | ArrayBuffer) {
    if (messageType === 'audio')
        return ('audio message 🎙');
    return (message as string);
}



function createDmsUpdateFunc(activeDmId: number, data: MessageEvent) {
    return (prevDms: DmListType[] | undefined): DmListType[] | undefined => {
        if (!prevDms) return;

        const formatLastMessage = formatMessage(data.messageType, data.messageContent);
        
        if (data.isSender) {
            const index = prevDms.findIndex((dm) => dm.id === data.to);
            if (index !== -1) {
                const updatedDm = { ...prevDms[index], lastMessage: formatLastMessage };
                return [updatedDm, ...prevDms.slice(0, index), ...prevDms.slice(index + 1)];
            }

            const newDm: DmListType = {
                id: data.to,
                firstName: 'blah',
                lastName: 'blah',
                lastMessage: formatLastMessage,
                profilePicture: '',
                isFavorite: false,
                status: 'online',
                unreadCount: 0,
            };
            return [newDm, ...prevDms];
        }

        const index = prevDms.findIndex((dm) => dm.id === data.from);
        if (index !== -1) {
            const unreadCount = prevDms[index].unreadCount + (activeDmId === data.from ? 0 : 1);
            const updatedDm = {
                ...prevDms[index],
                lastMessage: formatLastMessage,
                unreadCount,
            };
            return [updatedDm, ...prevDms.slice(0, index), ...prevDms.slice(index + 1)];
        }

        const newMessage: DmListType = {
            id: data.from,
            firstName: 'blah',
            lastName: 'blah',
            lastMessage: formatLastMessage,
            profilePicture: '',
            isFavorite: false,
            status: 'online',
            unreadCount: 1,
        };
        return [newMessage, ...prevDms];
    };
}




function registerSocketEvents(activeDmId: number, setDms: ReactSetter<DmListType[] | undefined>, setContacts: ReactSetter<DmListType[] | undefined>) {
    const userPresenceHandler = (onlineUsers: number[]) => {
        console.log('online-users:', onlineUsers);
    
        // Modify dms presence, changing the status (online, offline)
        const mutateDms = (dms: DmListType[] | undefined) => dms && changeParticipantPresence(dms, onlineUsers);
    
        setDms(mutateDms);
        setContacts(mutateDms);
    }

    const   messageEventHandler = (data: MessageEvent) => {
        // ? checking if the sended message, was already in the list, if so need to re-order the dms list
        // ? if not i need just to insert it in the first of the array, & the unseen counter should incerement 
        const   updateDms = createDmsUpdateFunc(activeDmId, data);
    
        setDms(updateDms);
    }

    // * create the callback that accepts a socket.io object, it will be called by
    // * the useSocketEventRegister and it's gonna register the event and there handlers
    const   regiterarFunction = prepareSocketEventRegistration([
                                ['global:online-users', userPresenceHandler],
                                ['chat:message', messageEventHandler]
                            ]);
    useSocketEventRegister(regiterarFunction, [activeDmId]);
}




const   handleFevoritesChange = (dmId: number, setDms: ReactSetter<DmListType[] | undefined>) => {
    console.log(`${dmId} fav changing..`);
    setDms((prev) => {
        if (!prev) return (prev);
        const index = prev.findIndex((dm) => dm.id === dmId);
        if (index === -1) return (prev);

        prev[index].isFavorite = !prev[index].isFavorite;
        return ([...prev]);
    });
}






const   useFetchAllAndSubscribe: () => {dms: StatePair, contacts: StatePair} = () => {
    const   { activeDmId } = useActiveDm();
    const   [dms, setDms] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_DMS);
    const   [contacts, setContacts] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_DMS);


    registerSocketEvents(activeDmId, setDms, setContacts);


    useEffect(() => {
        const   handleFavChange = (dmId: number) => handleFevoritesChange(dmId, setDms);

        eventObserver.subscribe(EventsEnum.APP_FAVORITE_CHANGE, handleFavChange);

        return () => {
            eventObserver.unsubscribe(EventsEnum.APP_FAVORITE_CHANGE, handleFavChange);
        }
    }, []);

    return {dms: [dms, setDms], contacts: [contacts, setContacts]}
}


export default useFetchAllAndSubscribe;


/*
SELECT * FROM dms
JOIN attachement ON attachement.dm_id = dms.id
WHERE 
  (m.senderId = userId1 AND m.receiverId = userId2)
   OR (m.senderId = userId2 AND m.receiverId = userId1)
*/