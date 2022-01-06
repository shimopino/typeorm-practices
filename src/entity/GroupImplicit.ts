import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserImplicit } from "./UserImplicit";

@Entity()
export class GroupImplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserImplicit)
  @JoinTable()
  users: UserImplicit[];
}
