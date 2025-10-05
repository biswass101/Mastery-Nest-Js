import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/profile/porfile.entity";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        PaginationModule,
        TypeOrmModule.forFeature([User, Profile]),
        forwardRef(() => AuthModule)
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {

}