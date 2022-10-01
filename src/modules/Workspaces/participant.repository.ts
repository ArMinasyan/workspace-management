import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ParticipantEntity } from './entities/participant.entity';

@Injectable()
export class ParticipantRepository extends Repository<ParticipantEntity> {
  constructor(private dataSource: DataSource) {
    super(ParticipantEntity, dataSource.createEntityManager());
  }

  joinToWorkspace(
    workspaceId: number,
    userId: number,
  ): Promise<ParticipantEntity> {
    return this.save({
      workspace: workspaceId,
      user: userId,
    });
  }

  inviteToWorkspace(
    workspaceId: number,
    userId: number,
    inviterId: number,
  ): Promise<ParticipantEntity> {
    return this.save({
      workspace: workspaceId,
      user: userId,
      inviter_id: inviterId,
    });
  }
}
