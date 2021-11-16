import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

interface user {
  sub: string;
  email: string;
  name: string;
  role: boolean;
  stripe_customer_id: string;
  iat: number;
  exp: number;
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const headers = request.headers.authorization.replace('Bearer ', '');
      const authorization = headers.replace(' ', '');
      const user = this.jwtService.decode(authorization) as user;

      if (user.sub) {
        const user_id = await this.userService
          .findOneById(user.sub)
          .then((user) => user.id);

        if (user_id === user.sub) {
          return true;
        }
      }
    } catch (err) {
      return false;
    }
  }
}
