import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkspaceEntity } from '../../workspaces/entities/workspace.entity';
import { BaseEntity } from '../../../common/helpers/baseEntity';
import { UsersEntity } from '../../auth/entities/users.entity';

@Entity({
  name: 'channels',
})
export class ChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.channels)
  @JoinColumn({
    name: 'workspace_id',
  })
  workspace: number;

  @Column()
  name: string;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: number;
}
