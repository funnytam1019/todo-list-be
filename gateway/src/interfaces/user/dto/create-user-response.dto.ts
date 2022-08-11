import { IUser } from "../user.interface";

export class CreateUserResponseDTO {
  message: string;
  data: {
    user: IUser;
    token: string;
  };
  errors: {[key: string]: any}
}