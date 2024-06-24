import { MessageBarProps } from "./MessageBarProps";

export type ChatListProps = {
    dms: MessageBarProps[];
    onClick: (id: number) => void
}