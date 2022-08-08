import { IUser } from "./user.interface";

export interface IServiceUserGetResponse {
  status: number;
  message: string;
  user: IUser | null;
}