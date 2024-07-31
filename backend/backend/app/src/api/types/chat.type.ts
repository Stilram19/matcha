
export interface EmittedMessage {
    to: number;
    messageType: 'text' | 'audio';
    messageContent: string | ArrayBuffer;
}


export interface UserEventData {
    targetUserId: number;
}

export interface    IUserBrief {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture: string;
    status: 'online' | 'offline';
}