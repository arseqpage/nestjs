import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
