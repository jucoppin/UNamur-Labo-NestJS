import { Module } from '@nestjs/common';
import { PublicController } from "./controllers/public.controller";
import { ManagerModule } from "../manager/manager.module";
import { BuildingModule } from "../building/building.module";

@Module({
  controllers: [
    PublicController,
  ],
  imports: [
    ManagerModule,
    BuildingModule,
  ]
})
export class PublicModule {}
