import {Server} from "Socket.io";

 export const connectToSocket=(server)=>{
    const io=new Server(server);
    return io;
}
