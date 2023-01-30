import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Building } from "../entities/building.entity";
import { DeepPartial } from "typeorm/common/DeepPartial";

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly repo: Repository<Building>
  ) {
  }

  async getAll(): Promise<Building[]> {
    return this.repo.find({
      relations: {
        manager: true,
      },
    })
  }

  async get(id: number): Promise<Building> {
    return this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: {
        manager: true,
      }
    })
  }

  async saveAll(buildings: Building[]): Promise<Building[]> {
    return this.repo.save(buildings);
  }

  createGeneric(dto: DeepPartial<Building>): Building {
    // const entity = new Building();
    // for (const key of Object.keys(dto)) {
    //   entity[key] = dto[key];
    // }
    // return entity;
    return this.repo.create(dto);
  }
}
