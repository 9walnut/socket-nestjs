import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  userid: string;

  @IsString()
  password: string;
}
