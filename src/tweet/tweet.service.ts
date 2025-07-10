import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {

    constructor(private readonly userService: UsersService) {}

    tweets: {text: string, date: Date, userId: number}[] = [
        {text: 'there is a war between iran and usa', date: new Date('2025-07-23'), userId: 1},
        {text: 'starlink is available in bangladesh ', date: new Date('2025-07-20'), userId: 2},
        {text: 'City University is getting known day by day', date: new Date('2024-02-02'), userId: 3},
    ]

    // getTweets(userId?: number) {
    //     const user = this.userService.getUserById(userId as number)
    //     const newTweets = this.tweets.map(t => ({...t, name: user?.name}))
    //     if(userId) {
    //         return newTweets.find(tweet => tweet.userId === userId); 
    //     }
    //     return newTweets;
    // }
}
