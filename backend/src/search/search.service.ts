import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RecentSearch } from "./entity/search.entity";
import { User } from "src/users/entity/user.entity";
import axios from "axios";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(RecentSearch)
    private searchRepository: Repository<RecentSearch>
  ) {}

  async saveSearch(user: User, query: string): Promise<RecentSearch> {
    const search = this.searchRepository.create({ user, query });
    return this.searchRepository.save(search);
  }

  async getRecentSearches(user: User): Promise<RecentSearch[]> {
    return this.searchRepository.find({ where: { user }, order: { createdAt: "DESC" } });
  }

  async deleteSearch(id: number, user: User): Promise<void> {
    await this.searchRepository.delete({ id, user });
  }

  async fetchMedia(query: string, type: string = "image") {
    const url = `https://api.openverse.engineering/v1/${type}?q=${encodeURIComponent(query)}&format=json`;
    const response = await axios.get(url);
    return response.data.results;
  }
}
