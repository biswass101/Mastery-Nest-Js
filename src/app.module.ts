import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { ProfileModule } from './profile/profile.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  appConfig from './config/app.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    UsersModule,
    TweetModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}`,
      load: [appConfig, databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities:  configService.get('database.autoLoadEntities'), //auto load entity
        synchronize: configService.get('database.syncronize'), // for dev mode only
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
     
      }),
    }),
    ProfileModule,
    HashtagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
