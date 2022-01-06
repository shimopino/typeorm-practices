import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserGroupExplicit } from "./UserGroupExplicit";
import { UserImplicit } from "./UserImplicit";

@Entity()
export class GroupExplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => UserGroupExplicit, userGroup => userGroup.group)
  userGroups: UserGroupExplicit[];
}
