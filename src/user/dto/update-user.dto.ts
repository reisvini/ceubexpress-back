import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  // @IsString()
  // @IsOptional()
  // password: string;

  @IsBoolean()
  @IsOptional()
  isUserAdmin: boolean;
}
