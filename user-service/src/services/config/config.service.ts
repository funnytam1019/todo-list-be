import { Transport } from '@nestjs/microservices';



export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      host: process.env.USER_SERVICE_HOST,
      port: process.env.USER_SERVICE_PORT,
    };
    this.envConfig.baseUri = process.env.BASE_URI;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.todoService = {
      options: {
        port: process.env.TODO_SERVICE_PORT,
        host: process.env.TODO_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}