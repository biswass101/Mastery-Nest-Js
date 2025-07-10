import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [UsersModule, TweetModule, TypeOrmModule.forRoot({
    type: 'postgres',
    entities: [],
    synchronize: true, // for dev mode only
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '2025Niloy',
    database: 'NestJS'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
