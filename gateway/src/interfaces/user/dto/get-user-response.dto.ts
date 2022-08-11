import { IUser } from "../user.interface";

export interface GetUserResponseDTO {
  message: string,
  data: {
    user: IUser | null,
  }
  errors: {[key: string]: any}
}