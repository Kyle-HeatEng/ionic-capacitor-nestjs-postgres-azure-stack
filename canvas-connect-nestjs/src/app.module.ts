import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './shared/prisma.service';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7d'}
  })],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
