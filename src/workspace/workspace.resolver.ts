import { WorkspaceModel } from './workspace.model';
import { WorkspaceService } from './workspace.service';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver(of => WorkspaceModel)
export class WorkspaceResolver {
    constructor(
        @Inject(WorkspaceService) private workspaceService: WorkspaceService,
    ) { }
    @Query(returns => WorkspaceModel)
    async workspace(@Args('id') id: string): Promise<WorkspaceModel> {
        return await this.workspaceService.findOne(id);
    }

    //   @ResolveField(returns => [InvoiceModel])
    //   async invoices(@Parent() customer): Promise<InvoiceModel[]> {
    //     const { id } = customer;
    //     return this.invoiceService.findByCustomer(id);
    //   }

    @Query(returns => [WorkspaceModel])
    async workspaces(): Promise<WorkspaceModel[]> {
        return await this.workspaceService.findAll();
    }

    @Mutation(returns => WorkspaceModel)
    async createWorkspace(
        @Args('name') name: string
    ): Promise<WorkspaceModel> {
        return await this.workspaceService.create({ name })
    }

}