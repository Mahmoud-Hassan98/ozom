import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    console.log(loginDto);
    
    const user = await this.usersService['userModel'].findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);    
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, username: user.username, email: user.email };
    const token = this.tokenService.generateToken(payload);
    return {
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token,
    };
  }
}
