import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { ManagerModule } from './manager/manager.module';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { BuildingModule } from './building/building.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "process";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['TYPEORM_HOST'],
      port: parseInt(process.env['TYPEORM_PORT']),
      username: process.env['TYPEORM_USERNAME'],
      password: process.env['TYPEORM_PASSWORD'],
      database: process.env['TYPEORM_DATABASE'],
      // dropSchema: true,
      // synchronize: true,
      autoLoadEntities: true,
      logging: process.env['TYPEORM_LOGGING'] === 'true' ? 'all' : false,
    }),
    JwtModule.register({
      secret: 'UNamur',
      signOptions: {
        expiresIn: '30s'
      }
    }),
    CoreModule,
    ManagerModule,
    BuildingModule,
    PublicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
