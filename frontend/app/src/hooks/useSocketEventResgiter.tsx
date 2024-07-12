import { Socket } from "socket.io-client";
import { useSocket } from "../context/SocketProvider";
import { useEffect } from "react";

type    UseEffectDestructorType = () => void;

export const   useSocketEventRegister = (registerFunction: (socket: Socket) => UseEffectDestructorType) => {
    const   socket = useSocket();

    useEffect(() => {
        if (!socket)
            return ;
        return registerFunction(socket);
    }, [socket])
}


