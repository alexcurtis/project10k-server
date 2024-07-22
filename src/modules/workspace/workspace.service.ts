import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkspaceModel } from './workspace.model';
import { CreateWorkspaceDTO } from './workspace.dto';
import { AccountService } from '../account/account.service';
import { CompanyService } from '../company/company.service';
import { CompanyModel } from '../company/company.model';


@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(WorkspaceModel)
        private workspaceRepository: Repository<WorkspaceModel>,
        private accountService: AccountService,
        private companyService: CompanyService
    ) { }

    async create(workspace: CreateWorkspaceDTO): Promise<WorkspaceModel> {
        const account = await this.accountService.findOne(workspace.account);
        console.log('finding....', workspace.account, account);
        return this.workspaceRepository.save({
            ...workspace,
            account
        });
    }

    async addCompany(id: string, companyId: string): Promise<WorkspaceModel> {
        // Grab Hydrated Workspace
        const hydratedWorkspace = await this.findOneHydrated(id);
        const company = await this.companyService.findOne(companyId);
        // console.log('test', companyId, hydratedWorkspace, company);
        //TODO PROPER ERROR MANAGEMENT
        if(!hydratedWorkspace || !company){ return null; }
        const companies = hydratedWorkspace.companies ? hydratedWorkspace.companies.concat([company]) : [company];
        return this.workspaceRepository.save({
            ...hydratedWorkspace,
            companies
        });
    }

    findAll(): Promise<WorkspaceModel[]> {
        return this.workspaceRepository.find();
    }

    findOne(id: string): Promise<WorkspaceModel> {
        return this.workspaceRepository.findOneBy({ id });
    }

    findByAccount(accountId): Promise<WorkspaceModel[]> {
        return this.workspaceRepository.createQueryBuilder('workspace')
            .where('workspace.account = :id', { id: accountId })
            .getMany();
    }

    // Find A Workspace With All Fields Hydrated (From Joins)
    async findOneHydrated(id: string): Promise<WorkspaceModel> {
        // Have to Load the workspace with the companies to get this
        // https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations
        return this.workspaceRepository.findOne({
            relations: { companies: true },
            where: { id }
        });
    }

}