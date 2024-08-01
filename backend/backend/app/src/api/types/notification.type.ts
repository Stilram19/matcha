

export interface INotification {
    id: number;
    type: string;
    title: string;
    message: string;
    actorId: number;
    profilePicture: string;
    firstName: string;
    lastName: string;
    notificationStatus: boolean; // read (true)/unread
}
