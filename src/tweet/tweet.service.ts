import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { User } from 'src/users/user.entity';
import { HashtagsService } from 'src/hashtags/hashtags.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { text } from 'stream/consumers';

@Injectable()
export class TweetService {

    constructor(
        private readonly userService: UsersService,
        private readonly hashtagService: HashtagsService,
        @InjectRepository(Tweet)
        private readonly tweetRep: Repository<Tweet>
    ) {}

    async getTweets(userId: number) {
        return await this.tweetRep.find({
            where: {user: {id: userId}},
            relations: {user: true, hashtags: true} 
        })
    }


    async createTweet(createTweetDto: CreateTweetDto) {
        let user = await this.userService.findUserById(createTweetDto.userId);

        let hashtags = await this.hashtagService.findHashtags(createTweetDto.hashtags as number[])

        let tweet = this.tweetRep.create({...createTweetDto, user: user as User, hashtags});

        return await this.tweetRep.save(tweet);
    }

    async updateTweet(updateTweetDto: UpdateTweetDto) {
        //find all hashtags
        const hashtags = await this.hashtagService.findHashtags(updateTweetDto.hashtags as Array<number>)

        //find the tweet
        let tweet = await this.tweetRep.findOneBy({id: updateTweetDto.id});
        if(!tweet) throw new NotFoundException("Tweet Not Found!");
        //update properties of tweet
        tweet.text = updateTweetDto.text ?? tweet.text
        tweet.image = updateTweetDto.image ?? tweet.image
        tweet.hashtags = hashtags;

        //Save the tweet
        return await this.tweetRep.save(tweet);
    }

    async deleteTweet(id: number) {
        await this.tweetRep.delete({id})
        return {
            deleted: true,
            id
        }
    }
}
