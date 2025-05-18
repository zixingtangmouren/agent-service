import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
