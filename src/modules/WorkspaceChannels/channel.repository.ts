import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class ChannelRepository extends Repository<ChannelEntity> {
  constructor(private dataSource: DataSource) {
    super(ChannelEntity, dataSource.createEntityManager());
  }

  findById(id: number) {
    return this.findOne({
      where: {
        id,
      },
      loadRelationIds: true,
    });
  }

  async createChannel(workspaceId: number, userId: number, { name }) {
    return await this.save({
      workspace: workspaceId,
      name,
      user_id: userId,
    });
  }
}
