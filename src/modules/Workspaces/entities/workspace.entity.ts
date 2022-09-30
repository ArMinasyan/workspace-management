import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChannelEntity } from '../../WorkspaceChannels/entities/channel.entity';
import { BaseEntity } from '../../../common/helpers/baseEntity';
import { ParticipantEntity } from './participant.entity';

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

  @OneToMany(() => ChannelEntity, (channel) => channel.workspace)
  channels: ChannelEntity[];

  @OneToMany(() => ParticipantEntity, (participant) => participant.workspace)
  participants: ParticipantEntity[];
}
