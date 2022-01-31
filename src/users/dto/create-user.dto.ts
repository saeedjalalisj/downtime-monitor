import { IsEmail, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  @Min(6)
  password: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  mobile?: string;
}
