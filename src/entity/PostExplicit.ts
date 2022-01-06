import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserExplicit } from "./UserExplicit";
import { UserImplicit } from "./UserImplicit";

@Entity()
export class PostExplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserExplicit, (user) => user.posts)
  user: UserExplicit;
}
