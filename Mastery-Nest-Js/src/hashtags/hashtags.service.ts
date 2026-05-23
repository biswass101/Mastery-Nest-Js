import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { In, Repository } from 'typeorm';
import { CreateHashTagDto } from './dto/create-hashtag.dto';

@Injectable()
export class HashtagsService {
    constructor(
        @InjectRepository(Hashtag) private readonly hashtagReposity: Repository<Hashtag>
    ) {}

    async createHashtag(createHashtagDto: CreateHashTagDto) {
        const hashtag = this.hashtagReposity.create(createHashtagDto);
        return await this.hashtagReposity.save(hashtag);
    }

    async findHashtags(hashtags: number[]) {
        return await this.hashtagReposity.find({
            where: {
                id: In(hashtags)
            }
        })
    }

    async deleteHashtag(id: number) {
        await this.hashtagReposity.delete({id});
        return {
            deleted: true,
            id
        }
    }

    async softDeleteHashtag(id: number) {
        await this.hashtagReposity.softDelete({id});
        return {
            deleted: true,
            id
        }
    }
}
