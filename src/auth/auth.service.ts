import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './auth.constants';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (user) {
      const payload = {
        username: user.username,
        sub: user.id,
      };
      return {
        access_token: this.createToken(payload),
      };
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.createToken(payload),
    };
  }

  createToken(payload) {
    return this.jwtService.sign(payload);
  }
}
