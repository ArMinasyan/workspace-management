import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthEntity } from './modules/auth/entities/auth.entity';

const rootDir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
console.log(join(rootDir, 'modules', '/**/*.entity.{js,ts}'));

@Module({
  imports: [
    AuthModule,
    WorkspacesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.db'),
        type: 'postgres',
        synchronize: true,
        logging: true,
        entities: [AuthEntity],
      }),
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
