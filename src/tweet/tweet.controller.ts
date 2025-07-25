import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

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

    @Patch()
    updateTweet(@Body() tweet: UpdateTweetDto) {
        return this.tweetService.updateTweet(tweet);
    }

    @Delete(':id')
    deleteTweet(@Param('id', ParseIntPipe) id: number) {
        return this.tweetService.deleteTweet(id);
    }
}
