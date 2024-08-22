import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { InputCompanyDto } from './company.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService) {}

    // @Query(() => [Company])
    // @UseGuards(JwtAuthGuard)
    // async companys(): Promise<Company[]> {
    //     return this.companyService.findAll();
    // }

    @Query(() => Company)
    @UseGuards(JwtAuthGuard)
    async company(@Args('id', { type: () => ID }) id: string): Promise<Company> {
        return this.companyService.findOne(id);
    }

    @Query(() => [Company])
    @UseGuards(JwtAuthGuard)
    async companySearch(@Args('term', { type: () => String }) term: string): Promise<Company[]> {
        return this.companyService.search(term);
    }

    // TODO - Dangerous UnGuarded Init Command.
    @Query(() => [Company])
    // @UseGuards(JwtAuthGuard)
    async companyDbInit(): Promise<Company[]> {
        return this.companyService.initDb();
    }

    @Mutation(() => Company)
    @UseGuards(JwtAuthGuard)
    async createCompany(@Args('company') company: InputCompanyDto): Promise<Company> {
        return this.companyService.create(company);
    }

    @Mutation(() => Company)
    @UseGuards(JwtAuthGuard)
    async updateCompany(
        @Args('id', { type: () => ID }) id: string,
        @Args('company') company: InputCompanyDto,
    ): Promise<Company> {
        return this.companyService.update(id, company);
    }

    @Mutation(() => Company)
    @UseGuards(JwtAuthGuard)
    async updateCompanyFilings(@Args('id', { type: () => ID }) id: string): Promise<Company> {
        return this.companyService.updateCompanyFilings(id);
    }
}
