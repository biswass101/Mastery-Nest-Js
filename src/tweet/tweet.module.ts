import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { HashtagsModule } from 'src/hashtags/hashtags.module';

@Module({
  imports: [UsersModule, HashtagsModule, TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetController],
  providers: [TweetService],
  
})
export class TweetModule {}
