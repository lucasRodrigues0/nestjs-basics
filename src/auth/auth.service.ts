import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return { id: user.id };
    }

    async generateTokens(userId: number) {

        const payload: AuthJwtPayload = { sub: userId }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])

        return {
            accessToken, refreshToken
        }

    }

    async login(userId: number) {

        const {accessToken, refreshToken} = await this.generateTokens(userId);

        const hashedRefreshToken = await argon2.hash(refreshToken);

        await this.userService.saveRefreshToken(userId, hashedRefreshToken);
        
        return {
            id: userId,
            accessToken,
            refreshToken
        }
    }

    refreshToken(userId: number) {
        const payload: AuthJwtPayload = { sub: userId }
        const token = this.jwtService.sign(payload);
        return {
            id: userId,
            token
        }
    }
}

