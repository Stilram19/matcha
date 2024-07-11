import { useEffect, useState } from "react";
import { delayData } from "../utils/delayData";
import { useSocket } from "../context/SocketProvider";
import { DmListType } from "../types";
import { Socket } from "socket.io-client";

interface MessageEvent {
    from: number;
    message: string;
}



function    registerChatListEventHandlers(socket: Socket, onMessageRecieved: (data: MessageEvent) => void, onUserPresence: (data: any) => void) {
    console.log(socket);
    socket.on('global:online-users', onUserPresence)

    socket.on('chat:message', onMessageRecieved);
    
    return () => {
        console.log('socket regiter (dependency mutated)');
        socket.removeListener('global:online-users', onUserPresence)
        socket.removeListener('chat:message', onMessageRecieved);
    }
}

// util
function changeParticipantPresence(data: DmListType[], onlineUser: number[]) {
    const onlineUserSet = new Set(onlineUser);

    console.log(data);
    const ret: DmListType[] = data.map(element => {
        const isOnline = onlineUserSet.has(element.id);
        const status = isOnline ? 'online' : 'offline';
        return element.status !== status ? {...element, status} : element;
    });
    console.log(ret);

    return (ret);
}


const   useFetchDms = () => {
    const   [dms, setDms] = useState<DmListType[] | undefined>();
    const   [favorites, setFavorites] = useState<DmListType[] | undefined>();
    const   [matches, setMatches] = useState<DmListType[] | undefined>();
    const   socket = useSocket();

    const fetchData = async (url: string, cb: (data: any) => void) => {
        const response = await fetch(url);
        const data = await response.json();

        cb(data);
    }

    useEffect(() => {
        console.log("fetching all data")
        fetchData('http://localhost:3000/chat/dms', (data) => {
            console.log('setting dms')
            setDms(data)
        })
        // fetchData('http://localhost:3000/chat/favorites', (data) => {
        //     console.log('setting favs');    
        //     setFavorites(data) 
        // })
        delayData(setFavorites);
        fetchData('http://localhost:3000/chat/dms', (data) => {
            console.log('setting matches')
            setMatches(data)
        })
    }, [])


    useEffect(() => {
        if (!socket)
            return ;
        const handler = (onlineUsers: any) => {
                console.log('helloooooooo');
                console.log(onlineUsers);
                // modify dms Presence
                setDms((dms) => (dms) ? changeParticipantPresence(dms, onlineUsers) : undefined);
                setMatches((dms) => (dms) ? changeParticipantPresence(dms, onlineUsers) : undefined);
        }

        const   messageEventHandler = (data: MessageEvent) => {
            const   msg: DmListType = {
                id: data.from,
                firstName: 'blah',
                lastName: 'blah',
                lastMessage: data.message,
                profilePicture: '',
                isFavorite: false,
                status: 'online',
            }

            setDms((prev: any) => [msg, ...prev]);
        }
        return registerChatListEventHandlers(socket, messageEventHandler, handler);
    }, [socket])

    return {dms, favorites, matches};
}

export default useFetchDms;