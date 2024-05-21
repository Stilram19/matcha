import { FC, ReactNode } from "react";
import Navbar from "../components/Navbar";


const SetupLayout: FC<{children: ReactNode}> = ({children}) => {

    return (
        <>
            <Navbar />
            { children }
        </>
    )
}

export default SetupLayout;