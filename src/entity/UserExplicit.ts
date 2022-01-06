import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { GroupImplicit } from "./GroupImplicit";
import { Post } from "./Post";
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

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
