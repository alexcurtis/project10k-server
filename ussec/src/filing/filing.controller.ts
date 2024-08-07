import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilingService } from './filing.service';
import { IFiling } from 'src/types/external';

interface FilingsCommandMessage {
  company: string;
}

@Controller('filing')
export class FilingController {
  constructor(private readonly filingService: FilingService) {}

  @MessagePattern({ cmd: 'company:filings:get' })
  getFilings(command: FilingsCommandMessage): Promise<IFiling[]> {
    return this.filingService.get(command.company);
  }
}
