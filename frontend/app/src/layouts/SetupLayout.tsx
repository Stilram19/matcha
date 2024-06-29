import { FC, ReactNode } from "react";
import GuestHeader from "../components/header/GuestHeader";


const SetupLayout: FC<{children: ReactNode}> = ({children}) => {

    return (
        <>
            <GuestHeader />
            { children }
        </>
    )
}

export default SetupLayout;