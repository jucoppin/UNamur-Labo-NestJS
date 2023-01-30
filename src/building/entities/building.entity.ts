import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { Manager } from "../../manager/entities/manager.entity";
import { DeepPartial } from "typeorm/common/DeepPartial";

@Entity()
export class Building extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'int', nullable: false })
  manager_id: number;

  @ManyToOne(() => Manager, { nullable: false })
  @JoinColumn({ name: 'manager_id' })
  manager: Manager;

  constructor(dto?: DeepPartial<Building>) {
    super();

    if (dto) {
      Object.assign(this, dto);
    }
  }

}
