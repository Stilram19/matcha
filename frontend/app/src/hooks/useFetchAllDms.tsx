import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DmListType, EventsEnum } from "../types";
import useFetch from "./useFetch";
import { changeParticipantPresence, prepareSocketEventRegistration } from "../utils/socket";
import { useSocketEventRegister } from "./useSocketEventResgiter";
import eventObserver from "../utils/eventObserver";
import { useActiveDm } from "../context/activeDmProvider";


// this interface should consistent with data that send by the io server
interface MessageEvent {
    from: number;
    message: string;
    // firstName: string;
    // lastName: string;
    // status: 'online' | 'offline';
    // isFavorite: boolean;
}

type    StatePair = [DmListType[] | undefined, React.Dispatch<React.SetStateAction<DmListType[] | undefined>>];

type    ReactSetter<T> = Dispatch<SetStateAction<T>>


// function reorderDmList(dms: DmListType[], dm: any) {

// }


function    createDmsUpdateFunc(activeDmId: number, data: MessageEvent) {
    return (prevDms: DmListType[] | undefined) => {
        if (!prevDms)
            return ;

        let newDms: DmListType[];
        const   index = prevDms.findIndex((value) => value.id === data.from)
        if (index !== -1) {
            // if message sent by the current selected conversation then do not increment the count
            const unreadCount = prevDms[index].unreadCount + (activeDmId === data.from ? 0 : 1);
            const dmItem: DmListType = {...prevDms[index], lastMessage: data.message, unreadCount};
            // * re-order the DmList
            newDms = [dmItem, ...prevDms.slice(0, index), ...prevDms.slice(index + 1)];
            return newDms;
        }
        
        const   msg: DmListType = {
            id: data.from,
            firstName: 'blah',
            lastName: 'blah',
            lastMessage: data.message,
            profilePicture: '',
            isFavorite: false,
            status: 'online',
            unreadCount: 1,
        }

        return [msg, ...prevDms];
    }
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

const handleSendMessage = (message: any, setDms: ReactSetter<DmListType[] | undefined>) => {
    // if the message was sent for the first time add it, otherwise update last message that the logged in user sent
    setDms((prevDms) => {
        if (!prevDms)
            return (prevDms);
        const index = prevDms.findIndex((dm) => dm.id === message.to);
        if (index !== -1) {
            const dmItem: DmListType = {...prevDms[index], lastMessage: message.message}
            return [dmItem, ...prevDms.slice(0, index), ...prevDms.slice(index + 1)];
        }
        const   newDm: DmListType = {
            id: message.to,
            firstName: 'blah',
            lastName: 'blah',
            lastMessage: message.message,
            profilePicture: '',
            isFavorite: false,
            status: 'online',
            unreadCount: 0,
        }
        return ([newDm, ...prevDms]);
    })
}








const   useFetchAllAndSubscribe: () => {dms: StatePair, contacts: StatePair} = () => {
    const   { activeDmId } = useActiveDm();
    const   [dms, setDms] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_DMS);
    const   [contacts, setContacts] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_DMS);


    registerSocketEvents(activeDmId, setDms, setContacts);


    useEffect(() => {
        const   handleFavChange = (dmId: number) => handleFevoritesChange(dmId, setDms);
        const   handleSendMsg = (message: any) => handleSendMessage(message, setDms);

        eventObserver.subscribe(EventsEnum.APP_FAVORITE_CHANGE, handleFavChange);
        eventObserver.subscribe(EventsEnum.APP_SEND_MESSAGE, handleSendMsg);

        return () => {
            eventObserver.unsubscribe(EventsEnum.APP_FAVORITE_CHANGE, handleFavChange);
            eventObserver.unsubscribe(EventsEnum.APP_SEND_MESSAGE, handleSendMsg);
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