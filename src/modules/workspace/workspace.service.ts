import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkspaceModel } from './workspace.model';
import { CreateWorkspaceDTO } from './workspace.dto';
import { AccountService } from '../account/account.service';
import { CompanyService } from '../company/company.service';
import { CompanyModel } from '../company/company.model';
import { JournalService } from '../journal/journal.service';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(WorkspaceModel)
        private workspaceRepository: Repository<WorkspaceModel>,
        private accountService: AccountService,
        private companyService: CompanyService,
        private journalService: JournalService
    ) { }

    async create(workspace: CreateWorkspaceDTO): Promise<WorkspaceModel> {
        // Find The Account (So We Can Get The Reference)
        console.log('in create workspace func');
        const account = await this.accountService.findOne(workspace.account);
        // Create A New Journal (1:1 Relationship)
        const journal = await this.journalService.createEmpty();

        console.log('creating workspace....', workspace.account, account, journal);
        return this.workspaceRepository.save({
            ...workspace,
            account,
            journal
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

    findOne(id: string, withJournal: boolean): Promise<WorkspaceModel> {
        return this.workspaceRepository.findOne({
            where: {id: id},
            relations: {
                journal: withJournal
            }
        });
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