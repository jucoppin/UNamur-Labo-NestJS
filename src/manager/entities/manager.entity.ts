import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { Building } from "../../building/entities/building.entity";

@Entity()
export class Manager extends BaseEntity {
  @PrimaryGeneratedColumn()
  override id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isActive: boolean;

  @OneToMany(() => Building, is => is.manager)
  buildings: Building[];

  constructor(firstName?: string, lastName?: string, isActive?: boolean) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }

}
