import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from './workspace.model';
import { Account } from '../account/account.model';
import { InputWorkspaceDto } from './workspace.dto';
import { JournalService } from '../journal/journal.service';
import { Journal } from '../journal/journal.model';

@Injectable()
export class WorkspaceService {
    constructor(@InjectModel(Workspace.name)
        private workspaceModel: Model<Workspace>,
        private journalService: JournalService) { }

    async findAll(): Promise<Workspace[]> {
        return this.workspaceModel.find().exec();
    }

    async findOne(id: string): Promise<Workspace> {
        // Populate The Workspaces As Well
        return this.workspaceModel
            .findById(id)
            .populate('journals', null, Journal.name)
            .exec();
    }

    async create(workspace: InputWorkspaceDto): Promise<Workspace> {
        const newWorkspace = new this.workspaceModel(workspace);
        return newWorkspace.save();
    }

    async createDefault(account: Account): Promise<Workspace> {
        const defaultWorkspace = new this.workspaceModel({
            name: 'Untitled Workspace',
            account,
            journals: []
        });
        // Each Account Has 1 Initial Journal (And Never Any Fewer)
        const defaultJournal = await this.journalService.createDefault(defaultWorkspace);
        defaultWorkspace.journals.push(defaultJournal);
        return defaultWorkspace.save();
    }

    async update(id: string, workspace: InputWorkspaceDto): Promise<Workspace> {
        return this.workspaceModel.findByIdAndUpdate(id, workspace, { new: true }).exec();
    }

    async delete(id: string): Promise<Workspace> {
        return this.workspaceModel.findByIdAndDelete(id).exec();
    }

}