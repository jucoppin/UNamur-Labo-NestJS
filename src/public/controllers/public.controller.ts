import { Controller, Get } from "@nestjs/common";
import { ManagerService } from "../../manager/services/manager.service";
import { Manager } from "../../manager/entities/manager.entity";
import * as process from "process";
import { DateTime } from "luxon";
import { BuildingService } from "../../building/services/building.service";
import { Building } from "../../building/entities/building.entity";

@Controller('public')
export class PublicController {
  constructor(
    private readonly managerService: ManagerService,
    private readonly buildingService: BuildingService,
  ) {
  }

  @Get('version')
  async getVersion(): Promise<string> {
    return '1.0.0';
  }

  @Get('seed')
  async seed(): Promise<any> {
    if (!process.env.hasOwnProperty('NODE_ENV') || process.env.NODE_ENV !== 'dev') {
      return;
    }

    const managers = [
      this.managerService.createGeneric({
        firstName: 'Azerty', lastName: 'Poiuytre'
      }),
      new Manager('Tartampion', 'Tutu', false),
      new Manager('Tata', 'pery', true),
    ];

    await this.managerService.saveAll(managers);

    const buildings: Building[] = [
      this.buildingService.createGeneric({
        name: 'Test building 1', address: 'Rue de namur', manager: managers[0],
      })
    ];

    await this.buildingService.saveAll(buildings);

    return { managers, buildings };
  }

  @Get('test-date')
  async testDate(): Promise<any> {
    const today = new Date();

    const luxonDate = DateTime.fromJSDate(today);
    return luxonDate.set({
      day: luxonDate.daysInMonth,
    }).plus({
      year: 10
    }).startOf('day').setLocale('fr').toLocaleString();
  }
}
