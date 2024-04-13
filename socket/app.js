import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const isUserExist = onlineUser.find((user) => user.userId === userId);

  if (!isUserExist) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
