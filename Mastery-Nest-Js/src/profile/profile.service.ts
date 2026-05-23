import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './porfile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepo: Repository<Profile>) {}
    
    async getProfileFromDB() {
        return await this.profileRepo.find({
            relations: {
                user: true,
            },
        });
    }
}
