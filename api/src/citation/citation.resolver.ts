import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Citation } from './citation.model';
import { CitationService } from './citation.service';
import { InputCitationDto } from './citation.dto';

@Resolver(() => Citation)
export class CitationResolver {
    constructor(private readonly citationService: CitationService) {}

    @Query(() => Citation)
    async citation(@Args('id', { type: () => ID }) id: string): Promise<Citation> {
        return this.citationService.findOne(id);
    }

    @Query(() => [Citation])
    async citationsOnWorkspace(@Args('workspaceId', { type: () => ID }) workspaceId: string): Promise<Citation[]> {
        return this.citationService.findAllOnWorkspace(workspaceId);
    }

    @Query(() => [Citation])
    async citationsOnFiling(
        @Args('workspaceId', { type: () => ID }) workspaceId: string,
        @Args('filingId', { type: () => ID }) filingId: string,
    ): Promise<Citation[]> {
        return this.citationService.findAllOnFiling(workspaceId, filingId);
    }

    @Mutation(() => Citation)
    async createCitation(@Args('citation') citation: InputCitationDto): Promise<Citation> {
        return this.citationService.create(citation);
    }

    @Mutation(() => Citation)
    async updateCitation(
        @Args('id', { type: () => ID }) id: string,
        @Args('citation') citation: InputCitationDto,
    ): Promise<Citation> {
        return this.citationService.update(id, citation);
    }

    @Mutation(() => Citation)
    async deleteCitation(@Args('id', { type: () => ID }) id: string): Promise<Citation> {
        return this.citationService.delete(id);
    }
}
