import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { InputCompanyDto } from './company.dto';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService) {}

    @Query(() => [Company])
    async companys(): Promise<Company[]> {
        return this.companyService.findAll();
    }

    @Query(() => Company)
    async company(@Args('id', { type: () => ID }) id: string): Promise<Company> {
        return this.companyService.findOne(id);
    }

    @Query(() => [Company])
    async companySearch(@Args('term', { type: () => String }) term: string): Promise<Company[]> {
        return this.companyService.search(term);
    }

    @Query(() => [Company])
    async companyDbInit(): Promise<Company[]> {
        return this.companyService.initDb();
    }

    @Mutation(() => Company)
    async createCompany(@Args('company') company: InputCompanyDto): Promise<Company> {
        return this.companyService.create(company);
    }

    @Mutation(() => Company)
    async updateCompany(
        @Args('id', { type: () => ID }) id: string,
        @Args('company') company: InputCompanyDto,
    ): Promise<Company> {
        return this.companyService.update(id, company);
    }

    @Mutation(() => Company)
    async updateCompanyFilings(@Args('id', { type: () => ID }) id: string): Promise<Company> {
        return this.companyService.updateCompanyFilings(id);
    }

    // @Mutation(() => Company)
    // async deleteCompany(
    //     @Args('id', { type: () => ID }) id: string
    // ): Promise<Company> {
    //     return this.companyService.delete(id);
    // }
}
