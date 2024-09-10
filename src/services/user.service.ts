import { randomUUID } from "crypto";

import { User, UserStatus } from "../entities";
import { Injectable } from "../di/injectable.decorator";

@Injectable()
export class UserService {
  private users: Set<User> = new Set<User>();

  constructor() {
    this.users.add({
      uuid: randomUUID(),
      username: "sender",
      firstName: "Sender",
      lastName: "Last Name",
      status: UserStatus.OFFLINE,
      token: "123456789",
    });

    this.users.add({
      uuid: "5bb0cf93-d3eb-41f7-927b-b005ee008cc5",
      username: "receiver",
      firstName: "Receiver",
      lastName: "Last Name",
      status: UserStatus.OFFLINE,
      token: "987654321",
    });
  }

  fetchUserByToken(token: string) {
    return [...this.users].find((user) => {
      return user.token === token;
    });
  }

  async findUserById(userId: string) {
    return [...this.users].find((user) => {
      return user.uuid === userId;
    });
  }

  async findAll() {
    return [...this.users];
  }

  updateStatus(user: User, status: UserStatus) {
    if (this.users.has(user)) {
      user.status = status;
    }
  }
}

export const userService = new UserService();
