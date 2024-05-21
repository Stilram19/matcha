import { FC, ReactNode } from "react";
import Navbar from "../components/Navbar";

type Props = {
    children: ReactNode;
}

const GuestLayout: FC<Props> = ({children}) =>  {

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default GuestLayout;