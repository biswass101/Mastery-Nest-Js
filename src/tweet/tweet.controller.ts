import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {}
    
    @Post()
    createTweet(@Body() tweet: CreateTweetDto) {
        return this.tweetService.createTweet(tweet);
    }
}
