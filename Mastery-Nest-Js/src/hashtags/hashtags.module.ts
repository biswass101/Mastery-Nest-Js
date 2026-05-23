import { Module } from '@nestjs/common';
import { HashtagsController } from './hashtags.controller';
import { HashtagsService } from './hashtags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';

@Module({
  controllers: [HashtagsController],
  providers: [HashtagsService],
  imports: [TypeOrmModule.forFeature([Hashtag])],
  exports: [HashtagsService]
})
export class HashtagsModule {}
