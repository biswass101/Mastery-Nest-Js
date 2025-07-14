import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    @Get(':id')
    getTweets(@Param('id', ParseIntPipe) id: number) {
        return this.tweetService.getTweets(id);
    }

    @Post()
    createTweet(@Body() tweet: CreateTweetDto) {
        return this.tweetService.createTweet(tweet);
    }
}
