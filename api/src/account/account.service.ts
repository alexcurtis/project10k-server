import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account } from "./account.model";
import { WorkspaceService } from "../workspace/workspace.service";
import { Workspace } from "../workspace/workspace.model";
import { InputAccountDto } from "./account.dto";
import { InputWorkspaceDto } from "src/workspace/workspace.dto";
import { UserService } from "src/user/user.service";
import { InputUserDto } from "src/user/user.dto";
import { InputCheckListDto } from "src/checklist/checklist.dto";
import { CheckListService } from "src/checklist/checklist.service";

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name)
        private accountModel: Model<Account>,
        private workspaceService: WorkspaceService,
        private userService: UserService,
        private checkListService: CheckListService
    ) {}

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().exec();
    }

    async findOne(id: string): Promise<Account> {
        // Populate The Workspaces As Well
        return this.accountModel
            .findById(id)
            .populate("workspaces", null, Workspace.name)
            .populate("checklists")
            .exec();
    }

    async create(account: InputAccountDto, admin: InputUserDto): Promise<Account> {
        const newAccount = new this.accountModel({
            ...account,
            workspaces: [],
            users: [],
        });
        // Each Account Has 1 Admin User
        const adminUser = await this.userService.create(admin, newAccount);
        newAccount.users.push(adminUser);
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
                { new: true }
            )
            .exec();
        return deletedWorkspace;
    }

    async createCheckListOnAccount(id: string, checkList: InputCheckListDto): Promise<Account> {
        const account = await this.findOne(id);
        if (!account) {
            throw new NotFoundException(`Account with Id ${id} not found`);
        }
        const newCheckList = await this.checkListService.createOnAccount(checkList, account);
        // Only Add To Account Checklist if No Parent (Root Checklist)
        if (!checkList.parent) {
            account.checklists.push(newCheckList);
            return account.save();
        }
        return account;
    }

    async update(id: string, account: InputAccountDto): Promise<Account> {
        return this.accountModel.findByIdAndUpdate(id, account, { new: true }).exec();
    }

    async delete(id: string): Promise<Account> {
        return this.accountModel.findByIdAndDelete(id).exec();
    }
}
