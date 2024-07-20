import { INotification } from "../../components/header/NotificationList";
import useFetch from "../../hooks/useFetch";


const    NotificationList = ({notifications}: {notifications: INotification[]}) => {

    return (
        <div className="flex flex-col gap-2">
            {
                notifications.map((notification) => {
                    return (
                        <div key={notification.id} className="w-full p-1 border border-e0 rounded-xl flex items-center gap-1 px-2">
                            <img className="h-[60px] w-[60px] object-cover rounded-full" src="/imgs/man_placeholder1.jpg" />
                            <div className="">
                                <span className="font-semibold break-words">{notification.message}</span>
                                <div className="">Monday</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}


const   NotificationPage = () => {
    const   [notifications, setNotifications] = useFetch<INotification[]>(import.meta.env.VITE_LOCAL_NOTIFICATION_API_URL);

    return (

        <div className="flex justify-around p-2 pt-3">
            <div className="flex flex-col md:w-1/2">
                <span className="text-3xl mb-2">Notifications</span>
                {
                    notifications && <NotificationList notifications={notifications} />
                }
            </div>
        </div>
    )

}


export default NotificationPage;