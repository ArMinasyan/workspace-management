import { DataSource, Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  findUserByEmail(email: string): Promise<UsersEntity> {
    return this.findOne({
      where: {
        email,
      },
    });
  }
}
