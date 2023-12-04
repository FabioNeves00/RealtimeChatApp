import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { MessageEntity } from './entities/message.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([MessageEntity]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [ChatController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
