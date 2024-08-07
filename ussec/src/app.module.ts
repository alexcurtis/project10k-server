import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilingModule } from './filing/filing.module';
import { ApidbModule } from './apidb/apidb.module';

@Module({
  imports: [FilingModule, ApidbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
