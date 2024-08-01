
const notificatioRoutes: {[key: string]: (actorId: number) => string} = {
    new_message: (actorId) => `/chat/${actorId}`,
    profile_visit: (actorId) => `/profile/${actorId}`,
    like: (actorId) => `/profile/${actorId}`,
    unlike: (actorId) => `/profile/${actorId}`,
}

export default notificatioRoutes;