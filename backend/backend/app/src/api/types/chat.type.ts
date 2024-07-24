
export interface EmittedMessage {
    to: number;
    messageType: 'text' | 'audio';
    messageContent: string | ArrayBuffer;
}


export interface UserEventData {
    targetUserId: number;
}
