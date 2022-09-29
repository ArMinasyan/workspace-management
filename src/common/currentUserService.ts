import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export default class CurrentUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly req: Request,
  ) {}

  get getUser(): any {
    const token = this.req?.headers?.authorization?.split(' ')[1] || null;
    return this.jwtService.verifyAsync(token, {
      complete: true,
      secret: process.env.JWT_SECRET,
    });
  }
}
