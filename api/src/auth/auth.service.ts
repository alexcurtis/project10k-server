import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { InputLoginDto } from './auth.dto';
import { JwtSession } from './auth.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async login(login: InputLoginDto): Promise<JwtSession> {
        // Grab User
        const user = await this.userService.findByEmail(login.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        // Compare Password
        const passwordHasMatch = await compare(login.password, user.password);
        // No Match
        if (!passwordHasMatch) {
            throw new UnauthorizedException();
        }

        // Match Return Token and User
        const payload = { subject: user._id, user_name: user.email };
        return {
            token: this.jwtService.sign(payload),
            user,
        };
    }
}
