import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
       @Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret
        })
    }

    async validate(payload: AuthJwtPayload) {

        console.log('Payload in JwtStrategy:', payload);

        if(!payload.sub || isNaN(payload.sub)) {
            throw new UnauthorizedException('sub invalido');
        }

        return { id: payload.sub }
    }
}
