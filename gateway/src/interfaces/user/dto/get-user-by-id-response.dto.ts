import { IUser } from "../user.interface";

export class GetUserByIdResponseDTO {
  message: string;
  data: {
    user: IUser;
  }
  errors: {[key: string]: any};
}