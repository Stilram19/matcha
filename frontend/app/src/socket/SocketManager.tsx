import { socket } from "./socket"


// ! this is a component it should be in the component directory
export const SocketManager = () => {

    const connect = () => {
        socket.connect()
    }

    return (
        <button className="p-1 bg-pink text-white rounded-lg" onClick={connect}>connect</button>
    )
}