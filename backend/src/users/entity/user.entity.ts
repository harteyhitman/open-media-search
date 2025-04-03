import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecentSearch } from "src/search/entity/search.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RecentSearch, (recentSearch) => recentSearch.user, { cascade: true })
  recentSearches: RecentSearch[];
}