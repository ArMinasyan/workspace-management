import { HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IResponse } from '../../common/helpers/IResponse';
import { InjectRepository } from '@nestjs/typeorm';
import responseMessage from '../../common/helpers/response-message';
import { SignUpDto } from './dto/sign-up.dto';
import { FileUploadService } from '../fileUpload/file-upload.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly fileService: FileUploadService,
  ) {}

  async signIn(payload: SignInDto): Promise<IResponse> {
    const user = await this.authRepository.findUserByEmail(payload.email);
    if (user?.id && bcrypt.compareSync(payload.password, user.password)) {
      const token = await this.jwtService.signAsync({
        id: user.id,
      });

      return responseMessage({
        data: {
          token,
        },
      });
    } else {
      return responseMessage({
        statusCode: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Incorrect email and/or password',
      });
    }
  }

  async signUp(
    payload: SignUpDto,
    file: { contentType: string; buffer: Buffer },
  ): Promise<IResponse> {
    const user = await this.authRepository.findUserByEmail(payload.email);
    let uploadedFile;
    if (user?.id) {
      return responseMessage({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already registerd',
      });
    }

    if (file?.contentType) {
      uploadedFile = await this.fileService.upload({
        buffer: file.buffer,
        contentType: file.contentType,
      });
    }
    const passwordHash = bcrypt.hashSync(payload.password, 12);
    const createdUser = await this.authRepository.save({
      email: payload.email,
      password: passwordHash,
      ...(uploadedFile?.url ? { profile_image: uploadedFile.url } : {}),
    });

    const token = await this.jwtService.signAsync({
      id: createdUser.id,
    });

    return responseMessage({
      statusCode: HttpStatus.CREATED,
      message: 'Registration success',
      data: {
        token,
      },
    });
  }
}
