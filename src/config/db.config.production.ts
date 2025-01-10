import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from "path";

export default (): PostgresConnectionOptions => ({
    type: "postgres",
    host: "localhost",
    port: +process.env.DB_PORT,
    entities: [
        `../${path.resolve(__dirname, "..")}/**/*.entity.{ts,js}`
    ],
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: false
})