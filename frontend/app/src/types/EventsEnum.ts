export enum    EventsEnum {
    // received events
    GLOBAL_PRESENCE = 'global:online-users',
    CHAT_RECEIVE = 'chat:message',

    // sended events
    CHAT_SEND = 'chat:send',
    NOTIFICATION_LIKE = 'notification:like',
    NOTIFICATION_UNLIKE = 'notification:unlike',
    NOTIFICATION_VISIT = 'notification:visit',
    
    // application events (pulisher-observer pattern)
    APP_FAVORITE_CHANGE = 'app:favorite',
    // APP_SEND_MESSAGE = 'app:send',
}