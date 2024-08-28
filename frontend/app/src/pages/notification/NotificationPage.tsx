import { useEffect } from "react";
import { INotification } from "../../components/notification/NotificationList";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { markNotificationAsRead, registerNotificationEventHandlers } from "../../components/notification/helpers";
import { dayAndTimeDateFormat } from "../../utils/dateFormatter";
import notificatioRoutes from "../../components/utils/notificationRoutes";
import { Link } from "react-router-dom";


const    NotificationList = ({notifications}: {notifications: INotification[]}) => {

    return (
        <div className="flex flex-col gap-2">
            {
                notifications.map((notification) => {
                    const   notificationLink = notificatioRoutes[notification.type] ? notificatioRoutes[notification.type](notification.actorId) : '#';

                    return (
                        <Link
                            to={notificationLink}
                            key={notification.id}
                            className="w-full p-1 border border-e0 rounded-xl flex items-center gap-1 px-2"
                        >
                            <img className="h-[60px] w-[60px] object-cover rounded-full" src="/imgs/man_placeholder1.jpg" />
                            <div className="">
                                <span className="font-semibold break-words">{notification.message}</span>
                                <div className="">{dayAndTimeDateFormat(notification.createdAt)}</div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )

}


const   NotificationPage = () => {
    const   {data: notifications, setData, fetchMoreData, hasMore} = usePaginatedFetch<INotification>(import.meta.env.VITE_LOCAL_NOTIFICATION_API_URL);

    useEffect(() => {
        markNotificationAsRead();
    }, [])

    registerNotificationEventHandlers(setData);

    return (

        <div className="flex justify-around p-2 pt-3">
            <div className="flex flex-col md:w-1/2 gap-4">
                <div className="text-4xl">Notifications</div>
                <hr className="mb-2"/>
                {
                    notifications && <NotificationList notifications={notifications} />
                }
                <div className="w-full flex justify-center">
                    {
                        hasMore ? <button onClick={fetchMoreData}>load more</button>
                        : <p>no more notifications</p>
                    }
                </div>
            </div>
        </div>
    )

}


export default NotificationPage;