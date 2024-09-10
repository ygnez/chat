import { Message, User } from "./entities";
import { ClientJoinChatDto, ClientJoiningChatDto } from "./dto";

export interface ServerToClientEvents {
  postingMessage: (chatId: string, message: Message) => void;
  readingMessages: (chatId: string) => void;
  joiningChat: (payload: ClientJoiningChatDto) => Promise<void>;
  leavingChat: (chatId: string) => void;
}

export interface ClientToServerEvents {
  postMessage: (chatId: string) => void;
  readMessages: (chatId: string) => void;
  joinChat: (payload: ClientJoinChatDto) => void;
  leaveChat: (chatId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: User;
}
