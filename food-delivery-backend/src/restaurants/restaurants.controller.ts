import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantService: RestaurantsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @Body()
        createRestaurantDto: CreateRestaurantDto,

        @CurrentUser()
        user: any
    ) {
        return this.restaurantService.create(createRestaurantDto, user.id);
    }
}
