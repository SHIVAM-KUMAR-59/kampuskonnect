export const mockConversations = [
  {
    user: {
      id: "1",
      name: "Rahul Sharma",
      role: "ALUMNI",
      profileImage: null,
    },
    lastMessage: "Hey, how are you?",
    lastMessageTime: new Date(),
    unreadCount: 2,
  },
];

export const mockConnections = [
  {
    id: "2",
    name: "Ananya Gupta",
    email: "ananya@gmail.com",
    role: "STUDENT",
    profileImage: null,
  },
];

export const mockMessages = [
  {
    id: "m1",
    sender: { id: "me" },
    message: "Hello!",
    createdAt: new Date(),
  },
  {
    id: "m2",
    sender: { id: "1" },
    message: "Hi there 👋",
    createdAt: new Date(),
  },
];
