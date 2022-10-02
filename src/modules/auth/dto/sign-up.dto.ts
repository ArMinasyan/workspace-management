import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import validationMessages from '../../../common/helpers/validation.messages';

export class SignUpDto {
  @ApiProperty()
  @IsEmail({}, { message: validationMessages.email })
  email: string;

  @ApiProperty()
  @IsString({ message: validationMessages.required })
  password: string;

  @ApiProperty({
    type: 'file',
    name: 'image',
  })
  image: any;
}
