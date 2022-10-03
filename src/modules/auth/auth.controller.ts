import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
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
  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto) {
    const response = await this.authService.signIn(payload);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Auth'],
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @UseInterceptors(FileInterceptor('image'))
  async signUp(
    @Body() payload: SignUpDto,
    @UploadedFile(FileTransformer) file,
  ) {
    const response = await this.authService.signUp(payload, file);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }
}
