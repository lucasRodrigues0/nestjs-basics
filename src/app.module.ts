import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import dbConfig from './config/db.config';
import dbConfigProduction from './config/db.config.production';

@Module({
  imports: [
    PropertyModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV === "production" ? dbConfigProduction : dbConfig
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true, //permite a expansão de variáveis
      load: [
        dbConfig,
        dbConfigProduction
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
