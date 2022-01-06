import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { GroupImplicit } from "./GroupImplicit";
import { PostImplicit } from "./PostImplicit";

@Entity()
export class UserImplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => PostImplicit, post => post.user)
  posts: PostImplicit[];
}
