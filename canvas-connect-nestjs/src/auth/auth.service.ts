import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared/prisma.service';

export type UserRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(user: UserRegisterRequest) {
    const hasEmail = await this.hasEmail(user.email);

    if (hasEmail) {
      throw new BadRequestException({
        success: false,
        message: 'User email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await this.prisma.user.create({
      data: {
        email: user.email,
        hashedPassword,
        name: user.name,
      },
    });

    return 'User registered successfully';
  }

  async login({ email, password }: { email: string; password: string }) {
    const hasEmail = await this.hasEmail(email);

    if (!hasEmail) {
      throw new NotFoundException({
        success: false,
        message: 'User email not found. Please register',
      });
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
      throw new BadRequestException({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const access_token = this.jwt.signAsync({
      sub: user.id,
    });

    return access_token;
  }

  private async hasEmail(email: string) {
    const hasEmail =
      (await this.prisma.user.count({
        where: {
          email,
        },
      })) > 0;

    return hasEmail;
  }
}
