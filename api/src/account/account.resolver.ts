import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { Account } from "./account.model";
import { AccountService } from "./account.service";
import { InputAccountDto } from "./account.dto";
import { InputWorkspaceDto } from "src/workspace/workspace.dto";
import { Workspace } from "src/workspace/workspace.model";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { InputUserDto } from "src/user/user.dto";
import { InputCheckListDto } from "src/checklist/checklist.dto";

@Resolver(() => Account)
export class AccountResolver {
    constructor(private readonly accountService: AccountService) {}

    @Query(() => Account)
    @UseGuards(JwtAuthGuard)
    async account(@Args("id", { type: () => ID }) id: string): Promise<Account> {
        return this.accountService.findOne(id);
    }

    // TODO - Dangerous UnGuarded Init Command.
    // @Mutation(() => Account)
    // async createAccount(
    //     @Args('account') account: InputAccountDto,
    //     @Args('admin') admin: InputUserDto,
    // ): Promise<Account> {
    //     return this.accountService.create(account, admin);
    // }

    @Mutation(() => Account)
    @UseGuards(JwtAuthGuard)
    async createWorkspaceOnAccount(
        @Args("id", { type: () => ID }) id: string,
        @Args("workspace", { type: () => InputWorkspaceDto }) workspace: InputWorkspaceDto
    ): Promise<Account> {
        return this.accountService.createWorkspaceOnAccount(id, workspace);
    }

    @Mutation(() => Account)
    @UseGuards(JwtAuthGuard)
    async deleteWorkspaceOnAccount(
        @Args("id", { type: () => ID }) id: string,
        @Args("workspaceId", { type: () => ID }) workspaceId: string
    ): Promise<Workspace> {
        return this.accountService.deleteWorkspaceOnAccount(id, workspaceId);
    }

    @Mutation(() => Account)
    @UseGuards(JwtAuthGuard)
    async createCheckListOnAccount(
        @Args("id", { type: () => ID }) id: string,
        @Args("checkList", { type: () => InputCheckListDto }) checkList: InputCheckListDto
    ): Promise<Account> {
        return this.accountService.createCheckListOnAccount(id, checkList);
    }

    @Mutation(() => Account)
    @UseGuards(JwtAuthGuard)
    async updateAccount(
        @Args("id", { type: () => ID }) id: string,
        @Args("account") account: InputAccountDto
    ): Promise<Account> {
        return this.accountService.update(id, account);
    }
}
