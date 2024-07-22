import { FC, ReactNode, useEffect, useState } from "react";
import LoggedInHeader from "../components/header/LoggedInHeader";
import { getCookie } from "../utils/generalPurpose";
import { useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode;
}

const LoggedInLayout: FC<Props> = ({children}) =>  {

    // check here that the user is logged in

    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const csrfClientExposedCookie = getCookie('csrfClientExposedCookie');

        if (!csrfClientExposedCookie) {
            setTimeout(() => {
                navigate('/login');
            }, 300);

            setIsRedirecting(true);
            return ;
        }

        const completeProfileCookie = getCookie('CompleteProfile');

        if (completeProfileCookie != '3') {
            setTimeout(() => {
                navigate('/complete-info/1');
            }, 300);

            setIsRedirecting(true);
            return ;
        }
    }, [])

    if (isRedirecting) {
        return ;
    }

    return (
        <>
            <LoggedInHeader />
            {children}
        </>
    )
}

export default LoggedInLayout;