import { IUser } from "../user.interface";

export interface GetUserResponseDto {
  message: string,
  data: {
    user: IUser | null,
  }
  errors: {[key: string]: any}
}