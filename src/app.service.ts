import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(message: MessageEntity) {
    return await this.messageRepository.insert(message);
  }

  async getMessages() {
    return await this.messageRepository.find();
  }

  async deleteMessage(id: number) {
    return await this.messageRepository.delete(id);
  }
}
