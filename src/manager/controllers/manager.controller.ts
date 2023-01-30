import { Body, Controller, Delete, Get, Param, Patch, Post, ServiceUnavailableException } from '@nestjs/common';
import { ManagerService } from "../services/manager.service";
import { Manager } from "../entities/manager.entity";
import { ID } from "../../core/interfaces/id.interface";
import { CreateManagerDTO } from "../dto/create-manager.dto";
import { PatchManagerDTO } from "../dto/patch-manager.dto";

@Controller('managers')
export class ManagerController {
  constructor(
    private readonly service: ManagerService
  ) {
  }

  @Get('')
  async getAll(): Promise<Manager[]> {
    // throw new ServiceUnavailableException();
    // console.log(await this.service.getAll());
    console.log(await this.service.getAll());
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Manager> {
    return this.service.get(id);
  }

  @Post()
  async createOne(@Body() dto: CreateManagerDTO): Promise<ID> {
    return this.service.create(dto);
  }

  @Patch(':id')
  async patchOne(@Param('id') id: number, @Body() dto: PatchManagerDTO): Promise<ID> {
    return this.service.patch(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
}
