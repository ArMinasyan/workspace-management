import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { WorkspaceEntity } from './entities/workspace.entity';

@Injectable()
export class WorkspaceRepository extends Repository<WorkspaceEntity> {
  constructor(private dataSource: DataSource) {
    super(WorkspaceEntity, dataSource.createEntityManager());
  }

  findById(id: number): Promise<WorkspaceEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  findBySubDomain(subDomain: string): Promise<WorkspaceEntity> {
    return this.findOne({
      where: {
        sub_domain: subDomain,
      },
    });
  }

  createWorkspace(
    name: string,
    subDomain: string,
    userId: number,
  ): Promise<WorkspaceEntity> {
    return this.save({
      name,
      sub_domain: subDomain,
      user_id: userId,
    });
  }
}
