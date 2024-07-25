import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Journal } from './journal.model';
import { Workspace } from '../workspace/workspace.model';
import { InputJournalDto, defaultJournalData } from './journal.dto';

@Injectable()
export class JournalService {
    constructor(@InjectModel(Journal.name) private journalModel: Model<Journal>) { }

    async findAll(): Promise<Journal[]> {
        return this.journalModel.find().exec();
    }

    async findOne(id: string): Promise<Journal> {
        return this.journalModel.findById(id).exec();
    }

    // TODO - DTO NOT SETUP WITH ENTRY OR BACK LINK ID TO WORKSPACE. MAYBE PASS WORKSPACE ID AS A PARAM FROM RESOLVER?
    async create(journal: InputJournalDto): Promise<Journal> {
        const newJournal = new this.journalModel(journal);
        return newJournal.save();
    }

    async createDefault(workspace: Workspace): Promise<Journal> {
        const defaultJournal = new this.journalModel({
            ...defaultJournalData,
            workspace
        });
        return defaultJournal.save();
    }

    async update(id: string, journal: InputJournalDto): Promise<Journal> {
        return this.journalModel.findByIdAndUpdate(id, journal, { new: true }).exec();
    }

    async delete(id: string): Promise<Journal> {
        return this.journalModel.findByIdAndDelete(id).exec();
    }

}