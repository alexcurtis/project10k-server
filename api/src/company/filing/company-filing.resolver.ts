import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanyFiling } from './company-filing.model';
import { CompanyFilingService } from './company-filing.service';
import { InputCompanyFilingDto } from './company-filing.dto';

@Resolver(() => CompanyFiling)
export class CompanyFilingResolver {
    constructor(private readonly companyFilingService: CompanyFilingService) {}

    @Query(() => CompanyFiling)
    async companyFiling(@Args('id', { type: () => ID }) id: string): Promise<CompanyFiling> {
        return this.companyFilingService.findOne(id);
    }

    @Query(() => [CompanyFiling])
    async companyFilings(
        @Args('companyId', { type: () => ID }) companyId: string,
        @Args('forms', { type: () => [String], nullable: true }) forms: string[],
    ): Promise<CompanyFiling[]> {
        return this.companyFilingService.findAll(companyId, forms);
    }

    // @Mutation(() => CompanyFiling)
    // async updateCompanyFiling(
    //     @Args('id', { type: () => ID }) id: string,
    //     @Args('companyFiling') companyFiling: InputCompanyFilingDto,
    // ): Promise<CompanyFiling> {
    //     return this.companyFilingService.update(id, companyFiling);
    // }
}
