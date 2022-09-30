import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { WorkspacesModule } from './modules/Workspaces/workspaces.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './modules/Auth/entities/users.entity';
import { WorkspaceEntity } from './modules/Workspaces/entities/workspace.entity';
import { ChannelEntity } from './modules/WorkspaceChannels/entities/channel.entity';
import AuthMiddleware from './common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ChannelModule } from './modules/WorkspaceChannels/channel.module';

@Module({
  imports: [
    AuthModule,
    WorkspacesModule,
    ChannelModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.db'),
        type: 'postgres',
        synchronize: configService.get<boolean>('database.sync'),
        logging: configService.get<boolean>('database.logging'),
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
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/Workspaces', method: RequestMethod.POST },
        { path: '/Workspaces/*', method: RequestMethod.PUT },
        { path: '/Workspaces/*', method: RequestMethod.PATCH },
        { path: '/Workspaces/*/channels', method: RequestMethod.POST },
        { path: '/Workspaces/*/channels/*', method: RequestMethod.PUT },
        { path: '/Workspaces/*/channels/*', method: RequestMethod.PATCH },
      );
  }
}
