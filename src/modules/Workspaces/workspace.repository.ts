import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { WorkspaceEntity } from './entities/workspace.entity';

@Injectable()
export class WorkspaceRepository extends Repository<WorkspaceEntity> {
  constructor(private dataSource: DataSource) {
    super(WorkspaceEntity, dataSource.createEntityManager());
  }

  findById(id: number) {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  findBySubDomain(subDomain: string) {
    return this.findOne({
      where: {
        sub_domain: subDomain,
      },
    });
  }

  async createWorkspace(name: string, subDomain: string, userId: number) {
    return await this.save({
      name,
      sub_domain: subDomain,
      user_id: userId,
    });
  }
}
