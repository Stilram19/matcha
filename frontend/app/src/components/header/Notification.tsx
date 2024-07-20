import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FaBell } from "react-icons/fa6";
import NotificationList, { INotification } from "./NotificationList";
import useOutsideClick from "../../hooks/useOutsideClick";
import { prepareSocketEventRegistration } from "../../utils/socket";
import { useSocketEventRegister } from "../../hooks/useSocketEventResgiter";
import { useLocation } from "react-router-dom";


function registerEventHandlers(setNotifications: Dispatch<SetStateAction<INotification[] | undefined>>) {
    const location = useLocation();

    const   handleNewNotification = (notification: INotification) => {
        if (location.pathname === "/chat")
            return ;
        setNotifications((prev) => {
            if (!prev)
                return (prev);
            return [notification, ...prev]
        })
    }

    const   registrarFunction = prepareSocketEventRegistration([
        ['notification:new', handleNewNotification]
    ]);

    useSocketEventRegister(registrarFunction);
}


const   Notification = () => {
    const   [isOpen, setIsOpen] = useState<boolean>(false);
    const   [notifications, setNotifications] = useFetch<INotification[]>(import.meta.env.VITE_LOCAL_NOTIFICATION_API_URL);    
    const   notificationRef = useOutsideClick(() => setIsOpen(false))
    const   [unreadCount, setUnreadCount] = useState<number>(0);

    const handleBellClick = () => {
            setIsOpen((prev) => !prev)
            // setUnreadCount(0);
            setNotifications((prev) => {
                return prev?.map((notification) => ({...notification, read: true}))
            })
    }

    useEffect(() => {
        if (!notifications)
            return ;  
        const count = notifications.reduce((acc, value) => acc + (!value.read ? 1 : 0), 0);
        setUnreadCount(count);
    }, [notifications])

    console.log(`count ${unreadCount}`)

    registerEventHandlers(setNotifications);


    return (
        <div ref={notificationRef} className="relative">
            <div className="relative cursor-pointer"  onClick={handleBellClick}>
                <FaBell size={28}  className="hover:text-pastel-pink"/>
                { unreadCount ?
                    <span className="absolute bg-red-600 top-0 -right-1 flex items-center justify-center w-[16px] h-[16px] font-semibold text-white rounded-full text-xs">
                        {unreadCount}
                    </span>
                    : null
                }
            </div>
            {
                isOpen && 
                <div  className="absolute z-10 -right-5 top-9 min-w-[350px] max-w-[350px] shadow-md">
                    <div className="absolute z-10 right-6 -top-1 h-5 w-5 bg-pastel-pink rotate-45"></div>
                    <div className="p-1 bg-pastel-pink text-black font-semibold rounded-t-md">
                        Notifications
                    </div>
                    <div className="w-full max-h-[60vh] overflow-auto scrollbar">
                        {
                            notifications && <NotificationList notifications={notifications} />
                        }
                        <div className="w-full text-center cursor-pointer bg-blue-50">load more</div>
                    </div>
                </div>
            }
        </div>
    )

}



export default Notification;