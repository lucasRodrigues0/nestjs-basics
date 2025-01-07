import { Property } from "src/entities/property.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    entities: [
        `${__dirname}/**/*.entity.{ts,js}`
    ],
    database: "real-estate-db",
    username: "postgres",
    password: "1234",
    synchronize: true
}