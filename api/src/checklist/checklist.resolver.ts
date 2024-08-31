import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { CheckList } from "./checklist.model";
import { CheckListService } from "./checklist.service";
import { InputCheckListDto } from "./checklist.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => CheckList)
export class CheckListResolver {
    constructor(private readonly checklistService: CheckListService) {}

    @Query(() => CheckList)
    @UseGuards(JwtAuthGuard)
    async checklist(@Args("id", { type: () => ID }) id: string): Promise<CheckList> {
        return this.checklistService.findOne(id);
    }

    @Query(() => [CheckList])
    @UseGuards(JwtAuthGuard)
    async checklists(@Args("accountId", { type: () => ID }) accountId: string): Promise<CheckList[]> {
        return this.checklistService.findAllInAccount(accountId);
    }

    @Mutation(() => CheckList)
    @UseGuards(JwtAuthGuard)
    async updateCheckList(
        @Args("id", { type: () => ID }) id: string,
        @Args("checklist") checklist: InputCheckListDto
    ): Promise<CheckList> {
        return this.checklistService.update(id, checklist);
    }

    @Mutation(() => CheckList)
    @UseGuards(JwtAuthGuard)
    async deleteCheckList(@Args("id", { type: () => ID }) id: string): Promise<CheckList> {
        return this.checklistService.delete(id);
    }
}
