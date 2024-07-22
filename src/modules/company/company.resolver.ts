import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { CompanyModel } from './company.model';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './company.dto';

@Resolver(of => CompanyModel)
export class CompanyResolver {
    constructor(
        @Inject(CompanyService) private companyService: CompanyService
    ) { }

    @Query(returns => CompanyModel)
    async company(@Args('id') id: string): Promise<CompanyModel> {
        return await this.companyService.findOne(id);
    }

    @Query(returns => [CompanyModel])
    async companies(): Promise<CompanyModel[]> {
        return await this.companyService.findAll();
    }

    @Mutation(returns => CompanyModel)
    async createCompany(
        @Args('company') company: CreateCompanyDTO,
    ): Promise<CompanyModel> {
        return await this.companyService.create(company)
    }
}