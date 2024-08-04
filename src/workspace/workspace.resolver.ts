import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Workspace } from './workspace.model';
import { WorkspaceService } from './workspace.service';
import { InputWorkspaceDto } from './workspace.dto';

@Resolver(() => Workspace)
export class WorkspaceResolver {
    constructor(private readonly workspaceService: WorkspaceService) {}

    @Query(() => [Workspace])
    async workspaces(): Promise<Workspace[]> {
        return this.workspaceService.findAll();
    }

    @Query(() => Workspace)
    async workspace(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Workspace> {
        return this.workspaceService.findOne(id);
    }

    // @Query(() => Workspace)
    // async workspacesByAccountId(
    //     @Args('accountId', { type: () => ID }) id: string
    // ): Promise<Workspace> {
    //     return this.workspaceService.findAllByAccountId(id);
    // }

    @Mutation(() => Workspace)
    async createWorkspace(
        @Args('workspace') workspace: InputWorkspaceDto,
    ): Promise<Workspace> {
        return this.workspaceService.create(workspace);
    }

    @Mutation(() => Workspace)
    async createNewJournalOnWorkspace(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Workspace> {
        return this.workspaceService.createNewJournalOnWorkspace(id);
    }

    @Mutation(() => Workspace)
    async deleteJournalOnWorkspace(
        @Args('id', { type: () => ID }) id: string,
        @Args('journalId', { type: () => ID }) journalId: string,
    ): Promise<Workspace> {
        return this.workspaceService.deleteJournalFromWorkspace(id, journalId);
    }

    @Mutation(() => Workspace)
    async updateWorkspace(
        @Args('id', { type: () => ID }) id: string,
        @Args('workspace') workspace: InputWorkspaceDto,
    ): Promise<Workspace> {
        return this.workspaceService.update(id, workspace);
    }

    @Mutation(() => Workspace)
    async deleteBook(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Workspace> {
        return this.workspaceService.delete(id);
    }
}
