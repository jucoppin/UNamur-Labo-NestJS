import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from "@nestjs/jwt";
import { ManagerModule } from './manager/manager.module';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'housing',
      password: '1234',
      database: 'housing',
      // dropSchema: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      secret: 'UNamur',
      signOptions: {
        expiresIn: '30s'
      }
    }),
    CoreModule,
    ManagerModule,
    PublicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
