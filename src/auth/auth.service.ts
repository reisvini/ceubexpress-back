import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user;
    try {
      user = await this.userService.findOne(email);
    } catch (err) {
      return null;
    }

    try {
      const isPasswordValid = compareSync(password, user.password);

      if (!isPasswordValid) return null;
    } catch (err) {
      return null;
    }

    return user;
  }

  async login(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.isUserAdmin,
      stripe_costumer_id: user.stripe_costumer_id,
    };

    delete user.password;

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
