

export interface INotification {
    id: number;
    type: string;
    title: string;
    message: string;
    actorId: number;
    profilePicture: string;
    actorFirstName: string;
    actorLastName: string;
    read: boolean;
}