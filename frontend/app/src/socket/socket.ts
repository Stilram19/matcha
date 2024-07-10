// import { io } from "socket.io-client";getSockets

import { Socket } from "socket.io-client";

export let socket: Socket | null = null;

export function setSocket(s: Socket) {
    socket = s;
    socket.on('global:online-users', (data) => {
        console.log('helloooooooo');
        console.log(data);
    })
}

// export function getSocket(): Socket | null {
//     return (socket);
// }