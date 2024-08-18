import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Account } from './account.model';
import { AccountService } from './account.service';
import { InputAccountDto } from './account.dto';
import { InputWorkspaceDto } from 'src/workspace/workspace.dto';
import { Workspace } from 'src/workspace/workspace.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Account)
export class AccountResolver {
    constructor(private readonly accountService: AccountService) {}

    // @Query(() => [Account])
    // async accounts(): Promise<Account[]> {
    //     return this.accountService.findAll();
    // }

    @Query(() => Account)
    @UseGuards(JwtAuthGuard)
    async account(@Args('id', { type: () => ID }) id: string): Promise<Account> {
        return this.accountService.findOne(id);
    }

    @Mutation(() => Account)
    async createAccount(@Args('account') account: InputAccountDto): Promise<Account> {
        return this.accountService.create(account);
    }

    @Mutation(() => Account)
    async createWorkspaceOnAccount(
        @Args('id', { type: () => ID }) id: string,
        @Args('workspace', { type: () => InputWorkspaceDto }) workspace: InputWorkspaceDto,
    ): Promise<Account> {
        return this.accountService.createWorkspaceOnAccount(id, workspace);
    }

    @Mutation(() => Account)
    async deleteWorkspaceOnAccount(
        @Args('id', { type: () => ID }) id: string,
        @Args('workspaceId', { type: () => ID }) workspaceId: string,
    ): Promise<Workspace> {
        return this.accountService.deleteWorkspaceOnAccount(id, workspaceId);
    }

    @Mutation(() => Account)
    async updateAccount(
        @Args('id', { type: () => ID }) id: string,
        @Args('account') account: InputAccountDto,
    ): Promise<Account> {
        return this.accountService.update(id, account);
    }

    // @Mutation(() => Account)
    // async deleteBook(
    //     @Args('id', { type: () => ID }) id: string
    // ): Promise<Account> {
    //     return this.accountService.delete(id);
    // }
}
