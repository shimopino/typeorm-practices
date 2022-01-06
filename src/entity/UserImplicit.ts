import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { GroupImplicit } from "./GroupImplicit";

@Entity()
export class UserImplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToMany(() => GroupImplicit)
  @JoinTable()
  groups: GroupImplicit[];
}
