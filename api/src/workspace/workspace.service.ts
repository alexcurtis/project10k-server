import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from './workspace.model';
import { Account } from '../account/account.model';
import { InputWorkspaceDto } from './workspace.dto';
import { JournalService } from '../journal/journal.service';
import { Journal } from '../journal/journal.model';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectModel(Workspace.name)
        private workspaceModel: Model<Workspace>,
        private journalService: JournalService,
        private companyService: CompanyService,
    ) {}

    async findAll(): Promise<Workspace[]> {
        return this.workspaceModel.find().exec();
    }

    async findOne(id: string): Promise<Workspace> {
        // Populate The Workspaces As Well
        return this.workspaceModel.findById(id).populate('journals', null, Journal.name).exec();
    }

    async create(workspace: InputWorkspaceDto): Promise<Workspace> {
        const newWorkspace = new this.workspaceModel(workspace);
        // Each Account Has 1 Initial Journal (And Never Any Fewer)
        const defaultJournal = await this.journalService.createOnWorkspace(newWorkspace);
        newWorkspace.journals.push(defaultJournal);
        return newWorkspace.save();
    }

    async createDefault(account: Account): Promise<Workspace> {
        return this.create({ name: 'Untitled Workspace', account: account._id });
    }

    // async create(workspace: InputWorkspaceDto): Promise<Workspace> {
    //     const newWorkspace = new this.workspaceModel(workspace);
    //     return newWorkspace.save();
    // }

    // async createDefault(account: Account): Promise<Workspace> {
    //     const defaultWorkspace = new this.workspaceModel({
    //         ...defaultWorkspaceDto,
    //         account,
    //     });
    //     // Each Account Has 1 Initial Journal (And Never Any Fewer)
    //     const defaultJournal = await this.journalService.createOnWorkspace(defaultWorkspace);
    //     defaultWorkspace.journals.push(defaultJournal);
    //     return defaultWorkspace.save();
    // }

    async createNewJournalOnWorkspace(id: string): Promise<Workspace> {
        const workspace = await this.findOne(id);
        // Each Account Has 1 Initial Journal (And Never Any Fewer)
        const newJournal = await this.journalService.createOnWorkspace(workspace);
        workspace.journals.push(newJournal);
        await workspace.save();
        // Return A Fresh Workspace (So Journal Entries Not Populated)
        // TODO - SEE IF I CAN ADJUST THIS WITHOUT DOING A FRESH PULL
        return this.findOne(id);
    }

    async deleteJournalFromWorkspace(id: string, journalId: string): Promise<Workspace> {
        // Delete the Journal
        const journal = await this.journalService.delete(journalId);
        // Update Workspace Journal Array -> Remove Journal ID
        return this.workspaceModel
            .findByIdAndUpdate(
                id,
                {
                    $pullAll: {
                        journals: [{ _id: journalId }],
                    },
                },
                { new: true },
            )
            .populate('journals', null, Journal.name)
            .exec();
    }

    async update(id: string, workspace: InputWorkspaceDto): Promise<Workspace> {
        return this.workspaceModel.findByIdAndUpdate(id, workspace, { new: true }).exec();
    }

    async delete(id: string): Promise<Workspace> {
        const workspace = await this.workspaceModel.findByIdAndDelete(id).exec();
        // Delete All Attached Journals (and Their Journal Entry - Handled In The Journal Service)
        await Promise.all(
            workspace.journals.map(async (journal) => {
                return this.journalService.delete(journal._id.toString());
            }),
        );
        return workspace;
    }

    async addCompany(id: string, companyId: string): Promise<Workspace> {
        const company = await this.companyService.findOne(id);
        if (!company) {
            throw new NotFoundException(`Company with Id ${id} not found`);
        }
        return this.workspaceModel
            .findByIdAndUpdate(
                id,
                {
                    $push: {
                        companies: company,
                    },
                },
                { new: true },
            )
            .exec();
    }
}
