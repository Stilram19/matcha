export type    ChatBoxProps = {
    messages: any[];
    // shouldScrollDown: boolean;
}

export type ChatListProps = {
    // dms: MessageBarProps[];
    onClick: (id: number) => void;
}

export type    PresenceType = 'online' | 'offline';

export type UserType = {
    id: number,
    username?: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    status: PresenceType,
}

type messageContentTypes = 'audio' | 'text';

export type ParticipantUser = UserType & {isFavorite: boolean}

export type DmListType = ParticipantUser & {lastMessage: string, isSender: boolean, messageType: messageContentTypes, unreadCount: number}

export type ContactDetailsType = UserType & {biography: string}

export type MessageProps = {
    isAudio: boolean,
    isSender: boolean,
    message: string,
    sentAt: string,
}



export interface MessageType {
    messageId: number;
    isSender: boolean;
    messageType: messageContentTypes;
    messageContent: string; // ? text message or the audio resourse url
    sentAt: string;
}

export interface IncomingMessagePayload {
    from: number;
    to: number;
    isSender: boolean;
    messageType: messageContentTypes;
    messageContent: string;
    sentAt: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    status: 'online' | 'offline';
    isFavorite: boolean;
}






// export type ChatListStateType = {
//     dms: DmListType[],
//     contacts: DmListType[],
//     searchInput: string,
//     currentTab: string,
// }