import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './modules/auth/entities/users.entity';
import { WorkspaceEntity } from './modules/workspaces/entities/workspace.entity';
import { ChannelEntity } from './modules/channels/entities/channel.entity';
import AuthMiddleware from './common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ChannelModule } from './modules/channels/channel.module';
import { ParticipantEntity } from './modules/workspaces/entities/participant.entity';

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
        entities: [
          UsersEntity,
          WorkspaceEntity,
          ChannelEntity,
          ParticipantEntity,
        ],
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
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/workspaces', method: RequestMethod.POST },
        { path: '/workspaces/join', method: RequestMethod.POST },
        { path: '/workspaces/invite', method: RequestMethod.POST },
        { path: '/workspaces/*', method: RequestMethod.PUT },
        { path: '/workspaces/*', method: RequestMethod.PATCH },
        { path: '/workspaces/*/channels', method: RequestMethod.POST },
        { path: '/workspaces/*/channels/*', method: RequestMethod.PUT },
        { path: '/workspaces/*/channels/*', method: RequestMethod.PATCH },
      );
  }
}
