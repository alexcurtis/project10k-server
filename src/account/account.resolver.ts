import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Account } from './account.model';
import { AccountService } from './account.service';
import { InputAccountDto } from './account.dto';

@Resolver(() => Account)
export class AccountResolver {
    constructor(private readonly accountService: AccountService) { }

    @Query(() => [Account])
    async accounts(): Promise<Account[]> {
        return this.accountService.findAll();
    }

    @Query(() => Account)
    async account(
        @Args('id', { type: () => ID }) id: string
    ): Promise<Account> {
        return this.accountService.findOne(id);
    }

    @Mutation(() => Account)
    async createAccount(
        @Args('account') account: InputAccountDto
    ): Promise<Account> {
        return this.accountService.create(account);
    }

    @Mutation(() => Account)
    async updateAccount(
        @Args('id', { type: () => ID }) id: string,
        @Args('account') account: InputAccountDto,
    ): Promise<Account> {
        return this.accountService.update(id, account);
    }

    @Mutation(() => Account)
    async deleteBook(
        @Args('id', { type: () => ID }) id: string
    ): Promise<Account> {
        return this.accountService.delete(id);
    }


}