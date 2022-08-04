import { IUser } from "../user.interface";

export interface UserGetResponseDTO {
  message: string,
  data: {
    user: IUser | null,
  }
  errors: {[key: string]: any}
}