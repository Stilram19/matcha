import { Link } from "react-router-dom";
import notificatioRoutes from "../utils/notificationRoutes";

export interface INotification {
    id: number;
    type: string;
    title: string;
    message: string;
    actorId: number;
    actorPicture: string;
    actorFirstName: string;
    actorLastName: string;
    read: boolean;
}


const   NotificationList = ({notifications}: {notifications: INotification[]}) => {

    // add a diffrent bg for unread notification
    return (
            <div className="bg-white p-1">
                {notifications?.map((value) => {
                    const   notificationLink = notificatioRoutes[value.type] ? notificatioRoutes[value.type](value.actorId) : '#';
                    return (
                        <Link to={notificationLink} key={value.id} className="p-0.5 flex items-center gap-1 px-2 w-full border-b hover:bg-blue-50 cursor-pointer">
                            <img className="h-[55px] w-[55px] object-cover rounded-full" src={value.actorPicture} />
                            <div className="w-[80%] flex flex-col justify-center overflow-x-hidden">
                                <div className="flex justify-between">
                                    <h1 className="font-semibold text-sm">{value.title}</h1>
                                    <h4 className="text-xs self-end">12:25</h4>
                                </div>
                                <h3 className="text-sm truncate">{value.message}</h3>
                            </div>
                        </Link>
                    )
                })
                }
            </div>
    )
}

export default NotificationList;