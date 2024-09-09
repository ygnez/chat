import { Message, User } from "./entities";

export interface ServerToClientEvents {
  newMessage: (chatId: string, message: Message) => void;
  readMessages: (chatId: string) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
}

export interface ClientToServerEvents {
  postMessage: (chatId: string) => void;
  readMessages: (chatId: string) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: User;
}
