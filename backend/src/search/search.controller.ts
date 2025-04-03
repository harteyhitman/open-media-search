import { Controller, Get, Post, Delete, Body, Req, UseGuards } from "@nestjs/common";
import { SearchService } from "./search.service";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { Request } from "express";

@Controller("search")
@UseGuards(AuthGuard)
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post("save")
  async saveSearch(@Req() req: Request, @Body() body: { query: string }) {
    return this.searchService.saveSearch(req.user, body.query);
  }

  @Get("recent")
  async getRecentSearches(@Req() req: Request) {
    return this.searchService.getRecentSearches(req.user);
  }

  @Get("media")
async searchMedia(@Body() body: { query: string; type?: string }) {
  return this.searchService.fetchMedia(body.query, body.type);
}

  @Delete("delete")
  async deleteSearch(@Req() req: Request, @Body() body: { id: number }) {
    return this.searchService.deleteSearch(body.id, req.user);
  }
}
