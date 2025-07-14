import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TweetService {

    constructor(
        private readonly userService: UsersService,
        
        @InjectRepository(Tweet)
        private readonly tweetRep: Repository<Tweet>
    ) {}

    async getTweets(userId: number) {}


    async createTweet(createTweetDto: CreateTweetDto) {
        let user = await this.userService.findUserById(createTweetDto.userId);

        let tweet = this.tweetRep.create({...createTweetDto, user: user as User});

        return await this.tweetRep.save(tweet);
    }
}
