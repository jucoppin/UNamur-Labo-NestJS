import { Controller, Get } from "@nestjs/common";
import { ManagerService } from "../../manager/services/manager.service";
import { Manager } from "../../manager/entities/manager.entity";
import * as process from "process";

@Controller('public')
export class PublicController {
  constructor(
    private readonly managerService: ManagerService,
  ) {
  }

  @Get('version')
  async getVersion(): Promise<string> {
    return '1.0.0';
  }

  @Get('seed')
  async generateManagers(): Promise<Manager[]> {
    if (!process.env.hasOwnProperty('NODE_ENV') || process.env.NODE_ENV !== 'dev') {
      return;
    }

    const managers = [
      new Manager('Tartampion', 'Tutu', false),
      new Manager('Tata', 'pery', true),
    ];

    return await this.managerService.saveAll(managers);
  }
}
