import { randomUUID } from "crypto";

import { User, UserStatus } from "../entities";

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
      uuid: randomUUID(),
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
}
