import { IUser } from "./user.interface";

export interface IServiceUserGet {
  status: number;
  message: string;
  user: IUser | null;
}