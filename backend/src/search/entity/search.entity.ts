import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "src/users/entity/user.entity";

@Entity()
export class RecentSearch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  query: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.recentSearches, { onDelete: "CASCADE" })
  user: User;
}
