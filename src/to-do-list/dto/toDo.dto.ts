import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createToDoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  desc: string;
}

export class getToDoDto {
  @ApiProperty()
  @IsString()
  userId: string;
}

export class updateToDoDto {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  desc: string;
}

export class deleteToDoDto {
  @ApiProperty()
  @IsString()
  _id: string;
}
