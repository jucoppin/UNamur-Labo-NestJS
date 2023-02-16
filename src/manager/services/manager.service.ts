import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Manager } from "../entities/manager.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ID } from "../../core/interfaces/id.interface";
import { CreateManagerDTO } from "../dto/create-manager.dto";
import { PatchManagerDTO } from "../dto/patch-manager.dto";
import { DeepPartial } from "typeorm/common/DeepPartial";

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly repo: Repository<Manager>
  ) {
  }

  async getAll(): Promise<Manager[]> {
    return this.repo.find({
      relations: {
        buildings: true,
      }
    });
  }

  async get(id: number): Promise<Manager> {
    return this.repo.findOneOrFail({
      where: { id },
      relations: {
        buildings: true,
      }
    });
  }

  createGeneric(dto: DeepPartial<Manager>): Manager {
    return this.repo.create(dto);
  }

  async create(dto: CreateManagerDTO): Promise<ID> {
    const entity = this.repo.create(dto);

    await this.repo.save(entity);

    return { id: entity.id };
  }

  async patch(id: number, dto: PatchManagerDTO): Promise<ID> {
    const entity = await this.get(id);

    this.repo.merge(entity, dto);

    it(dto.lastName)
    {
      entity.lastName = dto.lastName;
    }

    await this.repo.save(entity);

    return { id: entity.id };
  }

  async delete(id: number): Promise<void> {
    const entity = await this.get(id);

    try {
      await this.repo.remove(entity);
    } catch (e) {
      throw new ServiceUnavailableException();
    }
  }

  async saveAll(managers: Manager[]): Promise<Manager[]> {
    for (const manager of managers) {
      const managerFromDB = await this.repo.findOneBy({
        firstName: manager.firstName,
        lastName: manager.lastName,
      });

      if (managerFromDB) {
        managerFromDB.isActive = manager.isActive;
        await this.repo.save(managerFromDB);
        // Skip
      }
      else {
        await this.repo.save(manager);
      }
    }
    // return this.repo.save(managers);
    return managers;
  }
}
