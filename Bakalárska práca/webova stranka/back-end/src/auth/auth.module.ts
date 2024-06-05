import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/security/constants';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  providers: [AuthService],
  imports: [
    RedisModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
