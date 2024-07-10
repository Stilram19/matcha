import { FC, ReactNode } from "react";
import LoggedInHeader from "../components/header/LoggedInHeader";
import SocketProvider from '../context/SocketProvider';

type Props = {
    children: ReactNode;
}

const LoggedInLayout: FC<Props> = ({children}) =>  {

    return (
        <>
            <SocketProvider>
                <LoggedInHeader />
                {children}
            </SocketProvider>
        </>
    )
}

export default LoggedInLayout;