import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userid: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
