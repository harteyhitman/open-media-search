import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get( 'DB_HOST'),
        port: configService.get( 'DB_PORT'),
        username: configService.get( 'DB_USER'),
        password: configService.get( 'DB_PASS'),
        database: configService.get( 'DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }), AuthModule, UsersModule, SearchModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
