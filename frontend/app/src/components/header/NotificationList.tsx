export interface INotification {
    id: number;
    type: string;
    title: string;
    message: string;
    senderId: number;
    profilePicture: string;
    senderFirstName: string;
    senderLastName: string;
    read: boolean;
}


const   NotificationList = ({notifications}: {notifications: INotification[]}) => {

    return (
            <div className=" bg-blue-50 p-1">
                {notifications?.map((value) => {
                    return (
                        <div key={value.id} className="p-1 flex items-center gap-1 px-2 w-full">
                            <img className="h-[60px] w-[60px] object-cover rounded-full" src="/imgs/man_placeholder1.jpg" />
                            <div className="">
                                <span className="font-semibold break-words">{value.message}</span>
                                <div>Monday</div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
    )
}

export default NotificationList;