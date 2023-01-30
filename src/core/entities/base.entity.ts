import { AfterLoad, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  resourceURL: string;
  
  protected getResourceURL(): string {
    return `/${this.constructor.name.toLowerCase()}s'/${this.id}`;
  }

  @AfterLoad()
  afterLoad(): void {
    this.resourceURL = this.getResourceURL();
  }
}
