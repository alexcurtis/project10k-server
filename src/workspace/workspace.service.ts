import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from './workspace.model';
import { Account } from '../account/account.model';
import { InputWorkspaceDto } from './workspace.dto';

@Injectable()
export class WorkspaceService {
    constructor(@InjectModel(Workspace.name) private workspaceModel: Model<Workspace>) { }

    async findAll(): Promise<Workspace[]> {
        return this.workspaceModel.find().exec();
    }

    async findOne(id: string): Promise<Workspace> {
        return this.workspaceModel.findById(id).exec();
    }

    async create(workspace: InputWorkspaceDto): Promise<Workspace> {
        const newWorkspace = new this.workspaceModel(workspace);
        return newWorkspace.save();
    }

    async createDefault(account: Account): Promise<Workspace> {
        const defaultWorkspace = new this.workspaceModel({
            name: 'Untitled Workspace',
            account
        });
        return defaultWorkspace.save();
    }

    async update(id: string, workspace: InputWorkspaceDto): Promise<Workspace> {
        return this.workspaceModel.findByIdAndUpdate(id, workspace, { new: true }).exec();
    }

    async delete(id: string): Promise<Workspace> {
        return this.workspaceModel.findByIdAndDelete(id).exec();
    }

}