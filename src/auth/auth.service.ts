import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = {
      _id: user._id,
      name: user.name,
      //role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
