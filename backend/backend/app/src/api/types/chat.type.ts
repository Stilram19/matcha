export interface IDirectMessage {
    id: number,
    messageType: 'text' | 'audio',
    messageContent: string,
    sentAt: string,
}


export interface IncomingMessagePayload {
    to: number;
    messageType: 'text' | 'audio';
    messageContent: string | ArrayBuffer;
}

export interface OutgoingMessagePayload {
    messageId: number,
    from: number,
    to: number,
    isSender: boolean,
    firstName: string,
    lastName: string,
    profilePicture: string,
    status: string, 
    messageType: 'text' | 'audio',
    messageContent: string,
    sentAt: string,
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
