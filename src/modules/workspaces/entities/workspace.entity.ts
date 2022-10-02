import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChannelEntity } from '../../channels/entities/channel.entity';
import { BaseEntity } from '../../../common/helpers/baseEntity';
import { ParticipantEntity } from './participant.entity';
import { UsersEntity } from '../../auth/entities/users.entity';

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

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @OneToMany(() => ChannelEntity, (channel) => channel.workspace)
  channels: ChannelEntity[];

  @OneToMany(() => ParticipantEntity, (participant) => participant.workspace)
  participants: ParticipantEntity[];
}
