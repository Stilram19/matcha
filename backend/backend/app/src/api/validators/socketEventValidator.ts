import { EmittedMessage, UserEventData} from "../types/chat.type.js";


export function validateMessageData(data: any): data is EmittedMessage {
    if (!data.to || !data.message)
        return (false);
    if (!(typeof data.to === 'number' && typeof data.message === 'string'))
        return (false);
    return (true);
}


export function isValidUserEventData(data: UserEventData) {
    if (!data.targetUserId)
        return (false);
    if (!(typeof data.targetUserId === 'number'))
        return (false);
    return (true);
}
