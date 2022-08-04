import { IUser } from "../user.interface";

export class CreateUserResponseDTO {
  message: string;
  data: {
    user: IUser;
  };
  errors: {[key: string]: any}
}