export enum ProfileStatus {
  OFFLINE,
  BUSY,
  ONLINE,
}

export class Profile {
  uuid: number;
  username: string;
  status: ProfileStatus;
  metadata: Record<string, any>;
}
