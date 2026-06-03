import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly resaurantRepository: Repository<Restaurant>
    ) {}

    async create(createRestaurantDto: CreateRestaurantDto, ownerId: string) {

        const owner = await
        
        const restaurant = this.resaurantRepository.create({
            ...createRestaurantDto, owner
        });

        return await this.resaurantRepository.save(restaurant);
    }


}
