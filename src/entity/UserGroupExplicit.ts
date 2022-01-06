import {
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { GroupExplicit } from "./GroupExplicit";
import { UserExplicit } from "./UserExplicit";

@Entity()
export class UserGroupExplicit {
  @ManyToOne((type) => UserExplicit, (user) => user.userGroups)
  user: UserExplicit;

  @ManyToOne((type) => GroupExplicit, (group) => group.userGroups)
  group: GroupExplicit;

  @Column()
  authenticationType: string;
}
