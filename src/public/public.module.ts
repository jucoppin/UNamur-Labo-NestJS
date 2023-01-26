import { Module } from '@nestjs/common';
import { PublicController } from "./controllers/public.controller";
import { ManagerModule } from "../manager/manager.module";

@Module({
  controllers: [
    PublicController,
  ],
  imports: [
    ManagerModule,
  ]
})
export class PublicModule {}
