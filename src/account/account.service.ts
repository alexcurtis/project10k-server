import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.model';
import { WorkspaceService } from '../workspace/workspace.service';
import { Workspace } from '../workspace/workspace.model';
import { InputAccountDto } from './account.dto';

@Injectable()
export class AccountService {
    constructor(@InjectModel(Account.name)
        private accountModel: Model<Account>,
        private workspaceService: WorkspaceService) {
    }

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().exec();
    }

    async findOne(id: string): Promise<Account> {
        // Populate The Workspaces As Well
        return this.accountModel
            .findById(id)
            .populate('workspaces', null, Workspace.name)
            .exec();
    }

    async create(account: InputAccountDto): Promise<Account> {
        const newAccount = new this.accountModel({
            ...account,
            workspaces: []
        });
        // Each Account Has 1 Initial Workspace
        const defaultWorkspace = await this.workspaceService.createDefault(newAccount); 
        newAccount.workspaces.push(defaultWorkspace);
        return newAccount.save();
    }

    async update(id: string, account: InputAccountDto): Promise<Account> {
        return this.accountModel.findByIdAndUpdate(id, account, { new: true }).exec();
    }

    async delete(id: string): Promise<Account> {
        return this.accountModel.findByIdAndDelete(id).exec();
    }

}