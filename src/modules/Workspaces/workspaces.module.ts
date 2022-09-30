import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './entities/workspace.entity';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspacesSubRoutingController } from './workspaces-sub-routing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
  controllers: [WorkspacesController, WorkspacesSubRoutingController],
  providers: [WorkspacesService, WorkspaceRepository],
})
export class WorkspacesModule {}
