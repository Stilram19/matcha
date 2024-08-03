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

export type ParticipantUser = UserType & {isFavorite: boolean}

export type DmListType = ParticipantUser & {lastMessage: string, unreadCount: number}

export type ContactDetailsType = UserType & {biography: string}

export type MessageProps = {
    isAudio: boolean,
    isSender: boolean,
    message: string,
    sentAt: string,
}

type messageContentTypes = 'audio' | 'text';


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



export enum    EventsEnum {
    CHAT_SEND = 'chat:send',
    CHAT_RECEIVE = 'chat:message',
    GLOBAL_PRESENCE = 'global:online-users',
    APP_FAVORITE_CHANGE = 'app:favorite',
    APP_SEND_MESSAGE = 'app:send',
}


// export type ChatListStateType = {
//     dms: DmListType[],
//     contacts: DmListType[],
//     searchInput: string,
//     currentTab: string,
// }