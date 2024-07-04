import { Server, Socket } from 'socket.io';

const USER_STATUS_EVENT = "global:active";


function userPresence(server: Server, client: Socket, data: any) {

}


/**
 * @brief this function will emit the status of a user is it online or offline
*/
function registerGlobalHandlers(server: Server, client: Socket) {

    server.on(USER_STATUS_EVENT, (data) => userPresence(server, client, data))
}


export default registerGlobalHandlers;