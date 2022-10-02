import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import ValidationMessages from '../../../common/helpers/validation.messages';

export class SignInDto {
  @ApiProperty()
  @IsEmail({}, { message: ValidationMessages.email })
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
