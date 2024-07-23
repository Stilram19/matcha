
const notificatioRoutes: {[key: string]: (actorId: number) => string} = {
    new_message: (actorId) => `/chat/${actorId}`,
    profile_visit: (actorId) => `/profile/${actorId}`,
    liked_you: (actorId) => `/profile/${actorId}`,
    unliked_you: (actorId) => `/profile/${actorId}`,
}

export default notificatioRoutes;