export enum ProfileStatus {
  OFFLINE,
  BUSY,
  ONLINE,
}

export class Profile {
  id: number;
  username: string;
  status: ProfileStatus;
  metadata: Record<string, any>;
}
