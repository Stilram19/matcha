import { Socket } from "socket.io-client";
import { useSocket } from "../context/SocketProvider";
import { useEffect } from "react";

type    UseEffectDestructorType = () => void;

export const   useSocketEventRegister = (registerFunction: (socket: Socket) => UseEffectDestructorType, dependency?: any[]) => {
    const   socket = useSocket();

    useEffect(() => {
        if (!socket)
            return ;
        // console.log(dependency)
        return registerFunction(socket);
    }, [socket, ...(dependency ? dependency : [])])
}


