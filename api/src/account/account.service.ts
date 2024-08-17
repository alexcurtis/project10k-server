import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.model';
import { WorkspaceService } from '../workspace/workspace.service';
import { Workspace } from '../workspace/workspace.model';
import { InputAccountDto } from './account.dto';
import { InputWorkspaceDto } from 'src/workspace/workspace.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name)
        private accountModel: Model<Account>,
        private workspaceService: WorkspaceService,
    ) {}

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().exec();
    }

    async findOne(id: string): Promise<Account> {
        // Populate The Workspaces As Well
        return this.accountModel.findById(id).populate('workspaces', null, Workspace.name).exec();
    }

    async create(account: InputAccountDto): Promise<Account> {
        const newAccount = new this.accountModel({
            ...account,
            workspaces: [],
        });
        // Each Account Has 1 Initial Workspace
        const defaultWorkspace = await this.workspaceService.createDefault(newAccount);
        newAccount.workspaces.push(defaultWorkspace);
        return newAccount.save();
    }

    async createWorkspaceOnAccount(id: string, workspace: InputWorkspaceDto): Promise<Account> {
        const account = await this.findOne(id);
        if (!account) {
            throw new NotFoundException(`Account with Id ${id} not found`);
        }
        const newWorkspace = await this.workspaceService.create({ ...workspace, account: account._id });
        account.workspaces.push(newWorkspace);
        return account.save();
    }

    async deleteWorkspaceOnAccount(id: string, workspaceId: string): Promise<Workspace> {
        // Delete The Workspace
        const deletedWorkspace = await this.workspaceService.delete(workspaceId);
        if (!deletedWorkspace) {
            throw new NotFoundException(`Workspace with Id ${workspaceId} not found`);
        }
        // Remove The Workspace Reference From The Account
        await this.accountModel
            .findByIdAndUpdate(
                id,
                {
                    $pull: {
                        workspaces: deletedWorkspace._id,
                    },
                },
                { new: true },
            )
            .exec();
        return deletedWorkspace;
    }

    async update(id: string, account: InputAccountDto): Promise<Account> {
        return this.accountModel.findByIdAndUpdate(id, account, { new: true }).exec();
    }

    async delete(id: string): Promise<Account> {
        return this.accountModel.findByIdAndDelete(id).exec();
    }
}
