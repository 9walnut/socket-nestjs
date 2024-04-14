import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class AddChatDto {
  @ApiProperty({ description: '채팅방 ID' })
  @IsNumber()
  roomId: string;

  @ApiProperty({ description: '대화 메시지' })
  @IsString()
  message: string;
}
