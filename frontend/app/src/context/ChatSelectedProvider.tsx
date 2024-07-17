import { createContext, ReactNode, useContext } from "react";


const   SelectedContext = createContext<number>(-1);

const   ChatSelectedProvider = ({children, value} : {children: ReactNode, value: number}) => {
    // console.log(`new value ${value}`);

    return (
        <SelectedContext.Provider value={value}>
            {children}
        </SelectedContext.Provider>
    )
}

/**
 * @brief return the id of the selected conversation
*/
export const useSelectedDm = () => useContext(SelectedContext);

export default ChatSelectedProvider;