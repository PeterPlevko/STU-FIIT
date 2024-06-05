import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserRegistrationDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  surname: string;
}
