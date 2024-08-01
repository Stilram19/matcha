import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FaBell } from "react-icons/fa6";
import NotificationList, { INotification } from "./NotificationList";
import useOutsideClick from "../../hooks/useOutsideClick";
import { prepareSocketEventRegistration } from "../../utils/socket";
import { useSocketEventRegister } from "../../hooks/useSocketEventResgiter";
import { sendLoggedInActionRequest } from "../../utils/httpRequests";


function registerEventHandlers(setNotifications: Dispatch<SetStateAction<INotification[] | undefined>>) {

    const   handleNewNotification = (notification: INotification) => {
        // i think, i should not overwhelmed user, with message notifications when the chat is open
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


// ! move this to another file
async function markNotificationAsRead() {
    console.log('marking read')
    try {
        await sendLoggedInActionRequest('PATCH', import.meta.env.VITE_LOCAL_NOTIFICATION_MARK_READ);
    } catch (e) {
        console.log('marking notification as read error');
        console.log(e);
    }
}




const   Notification = () => {
    const   [isOpen, setIsOpen] = useState<boolean>(false);
    const   [notifications, setNotifications] = useFetch<INotification[]>(import.meta.env.VITE_LOCAL_NOTIFICATION_API_URL);    
    const   notificationRef = useOutsideClick(() => setIsOpen(false))
    const   [unreadCount, setUnreadCount] = useState<number>(0);

    const handleBellClick = () => {
            setIsOpen((prev) => !prev)
            // setUnreadCount(0);
            if (unreadCount) // marking only if there's something to mark
                markNotificationAsRead();
            setNotifications((prev) => {
                return prev?.map((notification) => ({...notification, notificationStatus: true}))
            })
    }

    useEffect(() => {
        if (!notifications)
        return ;
        // instead of calling this in every time the a notification came
        // i can assume that the count gonna increase by one..
        const count = notifications.reduce((acc, value) => acc + (!value.notificationStatus ? 1 : 0), 0);
        setUnreadCount(count);
    }, [notifications])

    console.log(`count ${unreadCount}`)

    registerEventHandlers(setNotifications);


    return (
        <div ref={notificationRef} className="w-full relative">
            <div className="w-full relative cursor-pointer"  onClick={handleBellClick}>
                <FaBell size={25}  className="hover:text-pastel-pink"/>
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
                    <div className="w-full max-h-[60vh] overflow-auto scrollbar bg-white">
                        <div onClick={() => {console.log('clicked'); setIsOpen(false);}}>
                            {
                                notifications && <NotificationList notifications={notifications} />
                            }
                        </div>
                        <div className="w-full text-center cursor-pointer hover:bg-blue-50">load more</div>
                    </div>
                </div>
            }
        </div>
    )

}



export default Notification;