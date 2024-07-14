import { useState } from "react";
import { delayData } from "../utils/delayData";
import { DmListType } from "../types";
import useFetch from "./useFetch";
import { changeParticipantPresence, prepareSocketEventRegistration } from "../utils/socket";
import { useSocketEventRegister } from "./useSocketEventResgiter";


// this interface should consistent with data that send by the io server
interface MessageEvent {
    from: number;
    message: string;
}

const   useFetchAllDms = () => {
    const   [dms, setDms] = useState<DmListType[] | undefined>();
    const   [favorites, setFavorites] = useState<DmListType[] | undefined>();
    const   [matches, setMatches] = useState<DmListType[] | undefined>();
    // const   socket = useSocket();


    useFetch('http://localhost:3000/chat/dms', (data) => setDms(data))
    // useFetch('http://localhost:3000/chat/favorites', (data) => setFavorites(data))
    delayData((data) => setFavorites(data));
    useFetch('http://localhost:3000/chat/dms', (data) => setMatches(data))


    const userPresenceHandler = (onlineUsers: any) => {
        console.log('helloooooooo');
        console.log(onlineUsers);

        // modify dms Presence, it's going to change the status (online, offline) 
        const   mutatedDms = (dms: DmListType[] | undefined) => {
                if (dms)
                    return (changeParticipantPresence(dms, onlineUsers));
        }

        setDms(mutatedDms);
        setMatches(mutatedDms);
    }


    const   messageEventHandler = (data: MessageEvent) => {
        // ? checking if the sended message, was already in the list, if so need to re-order the dms list
        // ? if not i need just to insert it in the first of the array, & the unseen counter should incerement 

        const   msg: DmListType = {
            id: data.from + (Math.floor(Math.random() * 1000000)),
            firstName: 'blah',
            lastName: 'blah',
            lastMessage: data.message,
            profilePicture: '',
            isFavorite: false,
            status: 'online',
            unreadCount: 1,
        }
        setDms((prev: any) => [msg, ...prev]);
    }

    // * create the callback that accepts a socket.io object, it will be called by
    // * the useSocketEventRegister and it's gonna register the event and there handlers
    const   regiterarFunction = prepareSocketEventRegistration([
                                ['global:online-users', userPresenceHandler],
                                ['chat:message', messageEventHandler]
                            ]);

    useSocketEventRegister(regiterarFunction)


    return {dms, favorites, matches};
}

export default useFetchAllDms;