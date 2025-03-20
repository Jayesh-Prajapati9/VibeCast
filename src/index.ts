import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface UserType{
  socket: WebSocket,
  roomId : string
}

let allSocket: UserType[] = []


wss.on("connection", (socket) => {
  
  socket.on("message", (message) => {
    if (typeof message !== 'string') {
      return
    }
    const parsedMessage = JSON.parse(message);
    allSocket.push({
      socket: socket,
      roomId : parsedMessage.payload.roomId
    });
  })

  
});
