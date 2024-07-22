import { FC, ReactNode, useEffect, useState } from "react";
import GuestHeader from "../components/header/GuestHeader";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/generalPurpose";

type Props = {
    children: ReactNode;
}

const GuestLayout: FC<Props> = ({children}) =>  {

    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const csrfClientExposedCookie = getCookie('csrfClientExposedCookie');

        if (csrfClientExposedCookie) {
            const completeProfileCookie = getCookie('CompleteProfile');
            let redirectPage = '/profile';

            if (completeProfileCookie != '3') {
                redirectPage = '/complete-info/1';
            }

            setTimeout(() => {
                navigate(redirectPage);
            }, 300);

            setIsRedirecting(true);
        }
    }, [])

    if (isRedirecting) {
        console.log('redirecting....')
        return ;
    }

    return (
        <>
            <GuestHeader />
            {children}
        </>
    )
}

export default GuestLayout;