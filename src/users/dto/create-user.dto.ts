import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: '手机号',
    example: '13800138000',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '邀请码',
    example: '123456',
  })
  inviteCode: string;
}
