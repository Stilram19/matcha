import { createContext, ReactNode, useContext } from 'react';
import { io, Socket } from "socket.io-client";
// import eventObserver from '../utils/eventObserver';
// import { GlobalEventEnum } from '../types/globalEventEnum';

type Props = {
    children: ReactNode;
}

const   SocketContext = createContext<Socket | null>(null);
const   IO_SERVER_URL = import.meta.env.VITE_API_URL;

const   SocketProvider = ({children}: Props) => {
    const   socket = io(IO_SERVER_URL, {withCredentials: true})

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;