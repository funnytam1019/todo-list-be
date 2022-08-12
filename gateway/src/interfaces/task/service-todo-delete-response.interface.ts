export interface IServiceTodoDeleteResponse {
  status: number;
  message: string;
  errors: { [key: string]: any };
}
