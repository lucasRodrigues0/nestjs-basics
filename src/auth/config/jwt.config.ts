import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export default registerAs(
    "jwt",
    (): JwtModuleOptions => ({
        secret: process.env.ACCESS_JWT_SECRET,
        signOptions: {
            expiresIn: process.env.ACCESS_JWT_EXPIRES_IN
        }
    }))