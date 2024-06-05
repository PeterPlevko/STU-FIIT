import { IsNotEmpty } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
