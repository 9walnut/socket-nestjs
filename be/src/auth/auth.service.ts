import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
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

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({
      where: { userid: loginUserDto.userid },
    });

    if (!user) {
      throw new UnauthorizedException('아이디가 존재하지 않습니다');
    }

    const hashedPassword = await bcrypt.hash(loginUserDto.password, 10);
    if (hashedPassword !== user.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }

    const token = this.jwtTokenService.generateToken(
      user.username,
      user.userid,
    );

    return {
      token: token,
    };
  }
}
