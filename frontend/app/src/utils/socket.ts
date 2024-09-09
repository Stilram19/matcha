import { Socket } from "socket.io-client";
import { DmListType } from "../types";
// import { Dispatch, SetStateAction } from "react";
// import { useSocket } from "../context/SocketProvider";

type    EventHandlerType = [event: string, (data: any) => void];

export function    prepareSocketEventRegistration(eventHandlers : EventHandlerType[]) {
    return (socket: Socket) => {
        // console.log("socket (event registration):");
        console.log(socket);

        eventHandlers.forEach(([event, handler]) => {
            socket.on(event, handler);
        })
    
        return () => {
            // console.log('socket regiter (dependency mutated)');

            eventHandlers.forEach(([event, handler]) => {
                socket.removeListener(event, handler);
            })
        }
    }
} 


export function changeParticipantPresence(data: DmListType[], onlineUser: number[]) {
    const onlineUserSet = new Set(onlineUser);

    // console.log(data);
    const ret: DmListType[] = data.map(element => {
        const isOnline = onlineUserSet.has(element.id);
        const status = isOnline ? 'online' : 'offline';
        return element.status !== status ? {...element, status} : element;
    });
    // console.log(ret);

    return (ret);
}

// export function socketEmitter(event: string, data: any) {
//     const socket = useSocket();

//     socket?.emit(event, data);
// }

// type UserPresenceType = (any & {status: PresenceType}) | undefined;

/**
 * this function will create a handler to mutate the status field of a data that is related to a user
 * @param activeDmId 
 * @param setData 
 */
// export function createPresenceChangeHandler(userId: number, setData: any) : (onlineUsers: number[]) => void {

//     return (onlineUsers: number[]) => {
//         const status = onlineUsers.indexOf(userId) !== -1 ? 'online' : 'offline';
//         setData((prev: any) => {
//             if (!prev || prev.status != status)
//                 return (prev);
//             return {...prev, status};
//         })
//     }
// }


/*
    return (socket: Socket) => {
        console.log(socket);
        socket.on('global:online-users', onUserPresence)
    
        socket.on('chat:message', onMessageRecieved);
    
        return () => {
            console.log('socket regiter (dependency mutated)');
            socket.removeListener('global:online-users', onUserPresence)
            socket.removeListener('chat:message', onMessageRecieved);
        }
    }
*/