import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Journal } from './journal.model';
import { Workspace } from '../workspace/workspace.model';
import { InputJournalDto, defaultJournalData } from './journal.dto';
import { JournalEntryService } from './entry/journal-entry.service';

@Injectable()
export class JournalService {
    constructor(@InjectModel(Journal.name)
        private journalModel: Model<Journal>,
        private journalEntryService: JournalEntryService) { }

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

    async createOnWorkspace(workspace: Workspace): Promise<Journal> {
        const defaultJournal = new this.journalModel({
            ...defaultJournalData,
            workspace
        });
        // Each Journal Has 1 Journal Entry (And Never Any Fewer)
        const defaultJournalEntry = await this.journalEntryService.createOnJournal(defaultJournal);
        defaultJournal.journalEntry = defaultJournalEntry;
        return defaultJournal.save();
    }

    // async update(id: string, journal: InputJournalDto): Promise<Journal> {
    //     return this.journalModel.findByIdAndUpdate(id, journal, { new: true }).exec();
    // }


    async update(id: string, journal: InputJournalDto): Promise<Journal> {
        return this.journalModel
            .findByIdAndUpdate(id, journal, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Journal> {
        const journal = await this.findOne(id);
        // Delete The Journal Entry (1:1 Mapping);
        await this.journalEntryService.delete(journal.journalEntry._id.toString());
        
        // Find All Journals That Reference This Journal And Remove The Reference
        await this.journalModel.updateMany({ workspace: journal.workspace }, {
            $pull: {
                'mindMapNode.edges':{
                    target: journal.mindMapNode._id
                }
            }
        }, { multi: true }).exec();
   
        // Delete The Journal
        return this.journalModel.findByIdAndDelete(id).exec();
    }


}