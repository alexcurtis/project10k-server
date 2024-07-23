import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { WorkspaceModel } from './workspace.model';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDTO } from './workspace.dto';

import { AccountModel } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { CompanyModel } from '../company/company.model';

@Resolver(of => WorkspaceModel)
export class WorkspaceResolver {
    constructor(
        @Inject(WorkspaceService) private workspaceService: WorkspaceService,
        @Inject(AccountService) private accountService: AccountService
    ) { }

    @Query(returns => WorkspaceModel)
    async workspace(
        @Args('id') id: string,
        @Args('withJournal') withJournal: boolean
    ): Promise<WorkspaceModel> {
        // With Journal Is An Optimisation ensuring Large Journals are Only Pulled From DB When Needed
        return await this.workspaceService.findOne(id, withJournal);
    }

    // TODO OK DURING DEV. NEEDS TO BE REMOVED OR ADDED SECURITY
    @Query(returns => [WorkspaceModel])
    async workspaces(): Promise<WorkspaceModel[]> {
        return await this.workspaceService.findAll();
    }

    // Resolve Account In Query
    @ResolveField(returns => AccountModel)
    async account(@Parent() workspace) {
        const { account } = workspace;
        return this.accountService.findOne(account);
    }

    // Resolve Companies In Query
    @ResolveField(returns => [CompanyModel])
    async companies(@Parent() workspace) {
        const { id } = workspace;
        const hydratedWorkspace = await this.workspaceService.findOneHydrated(id);
        return hydratedWorkspace.companies;
    }

    @Mutation(returns => WorkspaceModel)
    async createWorkspace(
        @Args('workspace') workspace: CreateWorkspaceDTO,
    ): Promise<WorkspaceModel> {
        return await this.workspaceService.create(workspace)
    }

    @Mutation(returns => WorkspaceModel)
    async addCompanyToWorkspace(
        @Args('id') id: string,
        @Args('companyId') companyId: string,
    ): Promise<WorkspaceModel> {
        return await this.workspaceService.addCompany(id, companyId);
    }


}