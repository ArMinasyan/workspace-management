import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersEntity } from './modules/auth/entities/users.entity';
import { WorkspaceEntity } from './modules/workspaces/entities/workspace.entity';
import { ChannelEntity } from './modules/workspace-channels/entities/channel.entity';
import AuthMiddleware from './common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ChannelModule } from './modules/workspace-channels/channel.module';

const rootDir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
console.log(join(rootDir, 'modules', '/**/*.entity.{js,ts}'));

@Module({
  imports: [
    AuthModule,
    WorkspacesModule,
    ChannelModule,
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
        entities: [UsersEntity, WorkspaceEntity, ChannelEntity],
      }),
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.register({
      signOptions: {
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/workspaces', method: RequestMethod.POST },
        { path: '/workspaces/*', method: RequestMethod.PUT },
        { path: '/workspaces/*', method: RequestMethod.PATCH },
        { path: '/workspaces/*/channels', method: RequestMethod.POST },
        { path: '/workspaces/*/channels/*', method: RequestMethod.PUT },
        { path: '/workspaces/*/channels/*', method: RequestMethod.PATCH },
      );
  }
}
