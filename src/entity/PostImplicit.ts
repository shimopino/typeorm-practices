import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserImplicit } from "./UserImplicit";

@Entity()
export class PostImplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserImplicit, (user) => user.posts)
  user: UserImplicit;
}
