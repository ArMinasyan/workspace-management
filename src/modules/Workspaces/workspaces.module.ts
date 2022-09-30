import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './entities/workspace.entity';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspacesSubRoutingController } from './workspaces-sub-routing.controller';
import { ParticipantEntity } from './entities/participant.entity';
import { ParticipantRepository } from './participant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity, ParticipantEntity])],
  controllers: [WorkspacesController, WorkspacesSubRoutingController],
  providers: [WorkspacesService, WorkspaceRepository, ParticipantRepository],
})
export class WorkspacesModule {}
