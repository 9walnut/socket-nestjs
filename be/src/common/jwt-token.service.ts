import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {
    console.log('JwtService secret:', this.jwtService['options'].secret);
  }

  generateToken(username: string, userid: string): string {
    const payload = { username, sub: userid };
    console.log('Using JWT Secret:', process.env.JWT_SECRET);
    const token = this.jwtService.sign(payload);
    console.log('Token generated:', token); // 생성된 토큰 출력
    return token;
  }
}
