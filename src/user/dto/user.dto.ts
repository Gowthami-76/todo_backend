import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  password: string;
}
