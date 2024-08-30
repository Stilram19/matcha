

export enum EmittedEvents {
    ERROR = 'error',
    LIKED = 'notification:liked',
    LIKED_BACK = 'notification:liked-back',
    UNLIKED = 'notification:unliked',
    VISITED = 'notification:visit',
}

export enum NotificationTypesEnum {
    NEW_MESSAGE = 'new_message',
    PROFILE_VISIT = 'profile_visit',
    LIKE = 'like',
    UNLIKE = 'unlike'
}

export const ACTOR_NAME_PLACEHOLDER = '{actor_name}';

/*
profile_visit
new_message
like
unlike
*/