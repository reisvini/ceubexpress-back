import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isUserAdmin?: boolean;

  @IsString()
  @IsOptional()
  stripe_customer_id: string;
}
