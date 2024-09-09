export enum UserStatus {
  OFFLINE,
  BUSY,
  ONLINE,
}

export class User {
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  status: UserStatus;
  metadata?: Record<string, any>;
}
