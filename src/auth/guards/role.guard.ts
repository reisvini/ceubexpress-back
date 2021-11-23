import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

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
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const headers = request.headers.authorization.replace('Bearer ', '');
      const authorization = headers.replace(' ', '');
      const user = this.jwtService.decode(authorization) as user;

      if (user.role) {
        const isUserAdmin = await this.prisma.user.findUnique({
          where: { id: user.sub },
          select: { isUserAdmin: true },
        });

        if (isUserAdmin.isUserAdmin === true) {
          return true;
        } else {
          return false;
        }
      }
    } catch (err) {
      return false;
    }
  }
}
