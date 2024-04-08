import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entitiy';
import { JwtTokenService } from 'src/common/jwt-token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ token: string; user: User }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new User();
    newUser.userid = createUserDto.userid;
    newUser.username = createUserDto.username;
    newUser.password = hashedPassword;

    const result = await this.usersRepository.save(newUser);

    // 토큰 생성
    const token = this.jwtTokenService.generateToken(
      newUser.username,
      newUser.userid,
    );

    // 반환 객체에서 비밀번호 필드 제외
    return {
      token: token,
      user: result,
    };
  }

  // async login(loginUserDto: LoginUserDto): Promise<any> {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
