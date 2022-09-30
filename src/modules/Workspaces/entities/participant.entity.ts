import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/helpers/baseEntity';
import { WorkspaceEntity } from './workspace.entity';
import { UsersEntity } from '../../Auth/entities/users.entity';

@Entity({
  name: 'participants',
})
export class ParticipantEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.id)
  @JoinColumn({ name: 'workspace_id' })
  workspace: number;

  @OneToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @Column({ nullable: true })
  inviter_id: number;
}
