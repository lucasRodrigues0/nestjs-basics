import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
       @Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>,
       private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret,
            ignoreExpiration: false
        })
    }

    async validate(payload: AuthJwtPayload) {

        if(!payload.sub || isNaN(payload.sub)) {
            throw new UnauthorizedException('sub invalido');
        }

        const userId = payload.sub;
        
        return this.authService.validadeJwtUser(userId);
    }
}
