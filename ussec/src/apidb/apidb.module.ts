import { Module } from '@nestjs/common';
import { ApidbService } from './apidb.service';
import { HttpModule } from '@nestjs/axios';
import { ApidbController } from './apidb.controller';

@Module({
  providers: [ApidbService],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [ApidbService],
  controllers: [ApidbController],
})
export class ApidbModule {}
