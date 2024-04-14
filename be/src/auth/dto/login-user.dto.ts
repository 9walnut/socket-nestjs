import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '유저 아이디' })
  @IsString()
  userid: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  password: string;
}
