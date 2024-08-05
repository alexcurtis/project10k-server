import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalEntry } from './journal-entry.model';
import { Journal } from '../journal.model';
import { InputJournalEntryDto, defaultJournalEntryData } from './journal-entry.dto';

@Injectable()
export class JournalEntryService {
    constructor(@InjectModel(JournalEntry.name) private journalEntryModel: Model<JournalEntry>) { }

    async findAll(): Promise<JournalEntry[]> {
        return this.journalEntryModel.find().exec();
    }

    async findOne(id: string): Promise<JournalEntry> {
        return this.journalEntryModel.findById(id).exec();
    }

    // // TODO - DTO NOT SETUP WITH ENTRY OR BACK LINK ID TO WORKSPACE. MAYBE PASS WORKSPACE ID AS A PARAM FROM RESOLVER?
    // async create(journal: InputJournalEntryDto): Promise<JournalEntry> {
    //     const newJournalEntry = new this.journalEntryModel(journal);
    //     return newJournalEntry.save();
    // }

    async createOnJournal(journal: Journal): Promise<JournalEntry> {
        const defaultJournalEntry = new this.journalEntryModel({
            ...defaultJournalEntryData,
            journal
        });
        return defaultJournalEntry.save();
    }

    async update(id: string, journal: InputJournalEntryDto): Promise<JournalEntry> {
        return this.journalEntryModel.findByIdAndUpdate(id, journal, { new: true }).exec();
    }

    async delete(id: string): Promise<JournalEntry> {
        return this.journalEntryModel.findByIdAndDelete(id).exec();
    }

}