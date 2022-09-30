import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChannelEntity } from '../../WorkspaceChannels/entities/channel.entity';
import { BaseEntity } from '../../../common/helpers/baseEntity';

@Entity({
  name: 'Workspaces',
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

  @OneToMany(() => ChannelEntity, (channel) => channel.workspace)
  channels: ChannelEntity[];
}
