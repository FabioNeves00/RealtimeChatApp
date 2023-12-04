import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageEntity } from './entities/message.entity';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger('ChatGateway');

  constructor(private readonly appService: AppService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: MessageEntity) {
    await this.appService.createMessage(payload);
    this.logger.debug('Message received: ' + JSON.stringify(payload));
    this.server.emit('new-message', payload);
  }

  @SubscribeMessage('get-messages')
  async getMessages() {
    return await this.appService.getMessages();
  }

  afterInit(server: Server) {
    this.logger.log(`Server Initialization: ${server}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Connected ${client.id}`);
  }
}
