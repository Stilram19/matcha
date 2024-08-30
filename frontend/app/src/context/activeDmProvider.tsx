import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from "react";

type    ActiveDmContextType = {
    activeDmId: number,
    setActiveDmId: Dispatch<SetStateAction<number>>
}

const   ActiveDmContext = createContext<ActiveDmContextType>({} as ActiveDmContextType);

const   ActiveDmProvider = ({children, value} : {children: ReactNode, value: ActiveDmContextType}) => {
    // console.log(`new value ${value}`);

    return (
        <ActiveDmContext.Provider value={value}>
            {children}
        </ActiveDmContext.Provider>
    )
}

/**
 * @brief return the id of the selected conversation
*/
export const useActiveDm = () => useContext(ActiveDmContext);

export default ActiveDmProvider;