import { Module } from '@nestjs/common';
import { ManagerController } from "./controllers/manager.controller";
import { ManagerService } from "./services/manager.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Manager } from "./entities/manager.entity";

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
  imports: [
    TypeOrmModule.forFeature([
      Manager,
    ])
  ],
})
export class ManagerModule {
}
