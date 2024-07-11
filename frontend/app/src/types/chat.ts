export type    ChatBoxProps = {
    messages: any[];
}

export type ChatListProps = {
    // dms: MessageBarProps[];
    onClick: (id: number) => void;
}

export type ParticipantUser = {
    id: number,
    firstName: string,
    lastName: string,
    profilePicture: string,
    isFavorite: boolean,
    status: 'online' | 'offline',
}

export type DmListType = ParticipantUser & {lastMessage: string}

export type MessageProps = {
    isSender: boolean,
    message: string,
    sentAt: string,
}
