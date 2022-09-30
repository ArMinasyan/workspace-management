import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ParticipantEntity } from './entities/participant.entity';

@Injectable()
export class ParticipantRepository extends Repository<ParticipantEntity> {
  constructor(private dataSource: DataSource) {
    super(ParticipantEntity, dataSource.createEntityManager());
  }

  joinToWorkspace(workspaceId: number, userId: number) {
    return this.save({
      workspace: workspaceId,
      user: userId,
    });
  }
}
