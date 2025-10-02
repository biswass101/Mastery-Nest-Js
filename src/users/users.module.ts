import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/profile/porfile.entity";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
    imports: [
        PaginationModule,
        TypeOrmModule.forFeature([User, Profile])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {

}