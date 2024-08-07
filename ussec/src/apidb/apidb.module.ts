import { Module } from '@nestjs/common';
import { ApidbService } from './apidb.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ApidbService],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [ApidbService],
})
export class ApidbModule {}
