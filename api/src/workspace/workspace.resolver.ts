import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Workspace } from './workspace.model';
import { WorkspaceService } from './workspace.service';
import { InputWorkspaceDto } from './workspace.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Resolver(() => Workspace)
export class WorkspaceResolver {
    constructor(private readonly workspaceService: WorkspaceService) {}

    // @Query(() => [Workspace])
    // @UseGuards(JwtAuthGuard)
    // async workspaces(): Promise<Workspace[]> {
    //     return this.workspaceService.findAll();
    // }

    @Query(() => Workspace)
    @UseGuards(JwtAuthGuard)
    async workspace(@Args('id', { type: () => ID }) id: string): Promise<Workspace> {
        return this.workspaceService.findOne(id);
    }

    // @Query(() => Workspace)
    // async workspacesByAccountId(
    //     @Args('accountId', { type: () => ID }) id: string
    // ): Promise<Workspace> {
    //     return this.workspaceService.findAllByAccountId(id);
    // }

    @Mutation(() => Workspace)
    @UseGuards(JwtAuthGuard)
    async createWorkspace(@Args('workspace') workspace: InputWorkspaceDto): Promise<Workspace> {
        return this.workspaceService.create(workspace);
    }

    @Mutation(() => Workspace)
    @UseGuards(JwtAuthGuard)
    async createNewJournalOnWorkspace(@Args('id', { type: () => ID }) id: string): Promise<Workspace> {
        return this.workspaceService.createNewJournalOnWorkspace(id);
    }

    @Mutation(() => Workspace)
    @UseGuards(JwtAuthGuard)
    async deleteJournalOnWorkspace(
        @Args('id', { type: () => ID }) id: string,
        @Args('journalId', { type: () => ID }) journalId: string,
    ): Promise<Workspace> {
        return this.workspaceService.deleteJournalFromWorkspace(id, journalId);
    }

    @Mutation(() => Workspace)
    @UseGuards(JwtAuthGuard)
    async updateWorkspace(
        @Args('id', { type: () => ID }) id: string,
        @Args('workspace') workspace: InputWorkspaceDto,
    ): Promise<Workspace> {
        return this.workspaceService.update(id, workspace);
    }

    @Mutation(() => Workspace)
    @UseGuards(JwtAuthGuard)
    async addCompanyToWorkspace(
        @Args('id', { type: () => ID }) id: string,
        @Args('companyId', { type: () => ID }) companyId: string,
    ): Promise<Workspace> {
        return this.workspaceService.addCompany(id, companyId);
    }
}
