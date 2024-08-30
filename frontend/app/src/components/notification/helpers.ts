import { Dispatch, SetStateAction } from "react";
import { INotification } from "./NotificationList";
import { prepareSocketEventRegistration } from "../../utils/socket";
import { useSocketEventRegister } from "../../hooks/useSocketEventResgiter";
import { sendLoggedInActionRequest } from "../../utils/httpRequests";


export function registerNotificationEventHandlers(setNotifications: Dispatch<SetStateAction<INotification[] | undefined>>) {

    const   handleNewNotification = (notification: INotification) => {
        // i think, i should not overwhelmed user, with message notifications when the chat is open
        console.log(notification);
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


export async function markNotificationAsRead() {
    console.log('marking read')
    try {
        await sendLoggedInActionRequest('PATCH', import.meta.env.VITE_LOCAL_NOTIFICATION_MARK_READ);
    } catch (e) {
        console.log('marking notification as read error');
        console.log(e);
    }
}
