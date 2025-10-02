import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    @Get()
    getAllTweets(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.tweetService.getAllTweets(paginationQueryDto);
    }

    @Get(':userId')
    getTweets(
        @Param('userId', ParseIntPipe) userid: number,
        @Query() paginationQueryDto: PaginationQueryDto
    ) {
        console.log(paginationQueryDto);
        return this.tweetService.getTweets(userid, paginationQueryDto);
    }

    @Post()
    createTweet(@Body() tweet: CreateTweetDto) {
        return this.tweetService.createTweet(tweet);
    }

    @Post('many')
    createManyTweets(@Body() tweets: CreateTweetDto[]) {
        return this.tweetService.createManyTweets(tweets);
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
