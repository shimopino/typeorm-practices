import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { GroupImplicit } from "./GroupImplicit";
import { PostExplicit } from "./PostExplicit";
import { UserGroupExplicit } from "./UserGroupExplicit";

@Entity()
export class UserExplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(type => UserGroupExplicit, userGroup => userGroup.user)
  userGroups: UserGroupExplicit[];

  @OneToMany(() => PostExplicit, post => post.user)
  posts: PostExplicit[];
}
