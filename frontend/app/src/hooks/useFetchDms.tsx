import { useEffect, useState } from "react";
import { delayData } from "../utils/delayData";
import { useSocket } from "../context/SocketProvider";
import { MessageBarProps } from "../types";
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


const   useFetchDms = () => {
    const   [dms, setDms] = useState<any>();
    const   [favorites, setFavorites] = useState<any>();
    const   [matchs, setMatchs] = useState<any>();
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
            console.log('setting matchs')
            setMatchs(data)
        })
    }, [])


    useEffect(() => {
        if (!socket)
            return ;
        const handler = (data: any) => {
                console.log('helloooooooo');
                console.log(data);
        }

        const   messageEventHandler = (data: MessageEvent) => {
            const   msg: MessageBarProps = {
                id: data.from,
                firstName: 'blah',
                lastName: 'blah',
                lastMessage: data.message,
                profilePicture: '',
                isFavorite: false
            }

            setDms((prev: any) => [msg, ...prev]);
        }
        return registerChatListEventHandlers(socket, messageEventHandler, handler);
    }, [socket])

    return {dms, favorites, matchs};
}

export default useFetchDms;