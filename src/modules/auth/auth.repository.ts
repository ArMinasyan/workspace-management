import { DataSource, Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(private dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }

  findUserByEmail(email: string) {
    return this.findOne({
      where: {
        email,
      },
    });
  }
}
