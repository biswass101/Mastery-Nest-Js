import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { UsersModule } from '../users/users.module';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { PaginationModule } from '../common/pagination/pagination.module';


@Module({
  imports: [
    UsersModule, 
    HashtagsModule,
    PaginationModule, 
    TypeOrmModule.forFeature([Tweet])
  ],
  controllers: [TweetController],
  providers: [TweetService],
  
})
export class TweetModule {}
