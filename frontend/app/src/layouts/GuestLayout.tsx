import { FC, ReactNode } from "react";
import GuestHeader from "../components/header/GuestHeader";

type Props = {
    children: ReactNode;
}

const GuestLayout: FC<Props> = ({children}) =>  {

    return (
        <>
            <GuestHeader />
            {children}
        </>
    )
}

export default GuestLayout;