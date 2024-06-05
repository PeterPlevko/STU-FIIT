import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserDto {
  id?: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  userType?: string;

  confirmPassword?: string;
}
