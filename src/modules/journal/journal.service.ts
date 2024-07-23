import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JournalModel } from './journal.model';
import { UpdateJournalDTO } from './journal.dto';

@Injectable()
export class JournalService {
    constructor(
        @InjectRepository(JournalModel)
        private journalRepository: Repository<JournalModel>
    ) { }

    async createEmpty(): Promise<JournalModel> {
        return this.journalRepository.save({
            content: ''
        });
    }

    findAll(): Promise<JournalModel[]> {
        return this.journalRepository.find();
    }

    findOne(id: string): Promise<JournalModel> {
        return this.journalRepository.findOneBy({ id });
    }

    async update(journal: UpdateJournalDTO): Promise<JournalModel> {
        // TODO - CHECK IF EXISTS AND ONLY UPDATE THE ONE THAT EXISTS - DO NOT CREATE A NEW JOURNAL
        // do we need to even return the journal back - makes no sense.. esp if journal very big...
        return this.journalRepository.save({
            ...journal
        });
    }

}