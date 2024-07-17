import { FC, ReactNode } from "react";
import GuestHeader from "../components/header/GuestHeader";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/generalPurpose";

type Props = {
    children: ReactNode;
}

const GuestLayout: FC<Props> = ({children}) =>  {

    const navigate = useNavigate();
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
    }

    return (
        <>
            <GuestHeader />
            {children}
        </>
    )
}

export default GuestLayout;