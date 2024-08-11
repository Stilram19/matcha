import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from "react";
import { MessageType } from "../types";


type    MessageContextType = {
    messages: MessageType[],
    setMessages: Dispatch<SetStateAction<MessageType[] | undefined>>,
    fetchMoreMessages: () => void;
}

const MessagesContext = createContext<MessageContextType>({} as MessageContextType);


const MessagesProvider = ({children, value}: {children: ReactNode, value: MessageContextType}) => {

    return (
        <MessagesContext.Provider value={value}>
            {children}
        </MessagesContext.Provider>
    )
}


export const useMessages = () => useContext(MessagesContext);


export default MessagesProvider;