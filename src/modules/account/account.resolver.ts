import { AccountModel } from './account.model';
import { AccountService } from './account.service';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { WorkspaceModel } from '../workspace/workspace.model';
import { WorkspaceService } from '../workspace/workspace.service';

@Resolver(of => AccountModel)
export class AccountResolver {
    constructor(
        @Inject(AccountService) private accountService: AccountService,
        @Inject(WorkspaceService) private workspaceService: WorkspaceService
    ) { }

    // TODO OK DURING DEV. NEEDS TO BE REMOVED OR ADDED SECURITY
    @Query(returns => AccountModel)
    async account(@Args('id') id: string): Promise<AccountModel> {
        return await this.accountService.findOne(id);
    }

    // TODO OK DURING DEV. NEEDS TO BE REMOVED OR ADDED SECURITY
    @Query(returns => [AccountModel])
    async accounts(): Promise<AccountModel[]> {
        return await this.accountService.findAll();
    }

    @ResolveField(returns => [WorkspaceModel])
    async workspaces(@Parent() account) {
        const { id } = account;
        return this.workspaceService.findByAccount(id);
    }

    // TODO OK DURING DEV. NEEDS TO BE REMOVED OR ADDED SECURITY
    @Mutation(returns => AccountModel)
    async createAccount(
        @Args('name') name: string
    ): Promise<AccountModel> {
        return await this.accountService.create({ name });
    }

}