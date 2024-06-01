import { FC, ReactNode } from "react";
import LoggedInHeader from "../components/header/LoggedInHeader";

type Props = {
    children: ReactNode;
}

const LoggedInLayout: FC<Props> = ({children}) =>  {

    return (
        <>
            <LoggedInHeader />
            {children}
        </>
    )
}

export default LoggedInLayout;