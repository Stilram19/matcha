import { KeyboardEvent } from "react"
import { io, Socket } from "socket.io-client";
import { setSocket } from "./socket";


// ! this is a component it should be in the component directory
export const SocketManager = () => {

    let socket : Socket | null = null;

    const connect = () => {
        socket?.connect()
    }

    const handleSend = (event: KeyboardEvent<HTMLInputElement> ) => {
        if (event.key === 'Enter') {
            const input = event.target as HTMLInputElement;
            console.log(input.value);
            socket =  io("http://localhost:3000", {autoConnect: false, auth: {token: +input.value}});
            setSocket(socket);
        }
    }

    return (
        <>
            <input className="border mr-1" type="text" onKeyDown={handleSend}/>
            <button className="p-1 bg-pink text-white rounded-lg" onClick={connect}>connect</button>
        </>
    )
}