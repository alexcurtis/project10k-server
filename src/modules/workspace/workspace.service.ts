import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkspaceModel } from './workspace.model';
import { CreateWorkspaceDTO } from './workspace.dto';
import { AccountService } from '../account/account.service';


@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(WorkspaceModel)
        private workspaceRepository: Repository<WorkspaceModel>,
        private accountService: AccountService
    ) { }

    async create(workspace: CreateWorkspaceDTO): Promise<WorkspaceModel> {
        const account = await this.accountService.findOne(workspace.account);
        console.log('finding....', workspace.account, account);
        return this.workspaceRepository.save({
            ...workspace,
            account
        });
    }

    findAll(): Promise<WorkspaceModel[]> {
        return this.workspaceRepository.find();
    }

    findOne(id: string): Promise<WorkspaceModel> {
        return this.workspaceRepository.findOneBy({ id });
    }

    findByAccount(accountId): Promise<WorkspaceModel[]> {
        console.log('findby account', accountId);
        return this.workspaceRepository.createQueryBuilder('workspace')
            .where('workspace.account = :id', { id: accountId })
            .getMany();
    }
}