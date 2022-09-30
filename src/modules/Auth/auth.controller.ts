import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTransformer } from '../../common/customValidators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    tags: ['Auth'],
  })
  @Post('sign-in')
  signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  @ApiOperation({
    tags: ['Auth'],
  })
  @ApiConsumes('multipart/form-data')
  @Post('sign-up')
  @UseInterceptors(FileInterceptor('image'))
  signUp(@Body() payload: SignUpDto, @UploadedFile(FileTransformer) file) {
    return this.authService.signUp(payload, file);
  }
}
