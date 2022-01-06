import { Column, Entity, ManyToOne } from "typeorm";
import { GroupExplicit } from "./GroupExplicit";
import { UserExplicit } from "./UserExplicit";

@Entity()
export class UserGroupExplicit {
  @ManyToOne((type) => UserExplicit, (user) => user.userGroups, {
    primary: true,
  })
  user: UserExplicit;

  @ManyToOne((type) => GroupExplicit, (group) => group.userGroups, {
    primary: true,
  })
  group: GroupExplicit;

  @Column()
  authenticationType: string;
}
