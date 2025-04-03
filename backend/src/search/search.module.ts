import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService], // Export the service for use in other modules
})
export class SearchModule {}
