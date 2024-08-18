import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/passport.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { jwtConstants } from 'src/guards/constants';

@Module({
    providers: [JwtStrategy, AuthService, AuthResolver],
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
        UserModule,
    ],
    exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
