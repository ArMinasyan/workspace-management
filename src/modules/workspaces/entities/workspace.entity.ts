import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChannelEntity } from '../../workspace-channels/entities/channel.entity';
import { BaseEntity } from '../../../common/helpers/baseEntity';

@Entity({
  name: 'workspaces',
})
export class WorkspaceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sub_domain: string;

  @Column()
  user_id: number;

  @OneToMany(() => ChannelEntity, (channel) => channel.workspace_id)
  channels: ChannelEntity[];
}
