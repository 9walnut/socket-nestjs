import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(username: string, userid: string): string {
    const payload = { username, sub: userid };
    return this.jwtService.sign(payload);
  }
}
