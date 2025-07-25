import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { ProfileModule } from './profile/profile.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TweetModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './src/.env' //if it's not in the root directory
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: true, //auto load entity
        synchronize: true, // for dev mode only
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '2025Niloy',
        database: 'NestJS',
      }),
    }),
    ProfileModule,
    HashtagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
