import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { Company } from './company.model';
import { InputCompanyDto } from './company.dto';
import { CompanyFilingService } from './filing/company-filing.service';

import * as secCompanyJson from './company_tickers.json';
import { hasFailedBecauseAlreadyExists } from 'src/utils/mongoose';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name)
        private companyModel: Model<Company>,
        private companyFilingService: CompanyFilingService,
    ) {}

    async findAll(): Promise<Company[]> {
        return this.companyModel.find().exec();
    }

    async findOne(id: string): Promise<Company> {
        return this.companyModel.findById(id).exec();
    }

    async search(term: string): Promise<Company[]> {
        // Search For The Companies
        const companies = await this.companyModel.find({ $text: { $search: term } }).exec();
        // TODO - Make This More Efficent - Update Only Every So Often
        // Async + Optimisticly Pull and Update Company Filings When It Has Been Searched By User
        await Promise.all(
            companies.map(async (company) => {
                const exists = await this.companyFilingService.exists(company);
                if (exists) {
                    return; // For Now. Simply Pull If Does Not Exist. Later Extension Will Be To Refresh After A Certain Period
                }
                return this.companyFilingService.update(company);
            }),
        );
        return companies;
    }

    // For Dev Purposes. Init DB With Companies From SEC Json
    async initDb(): Promise<Company[]> {
        for (const secCompanyIndex in secCompanyJson) {
            const secCompany = secCompanyJson[secCompanyIndex];
            try {
                await this.companyModel.create({
                    apidbId: secCompany.cik_str,
                    ticker: [secCompany.ticker],
                    title: secCompany.title,
                    database: 'ussec',
                });
            } catch (error) {
                console.log('Error', error);
                // If Duplicate On Key. Then Check Ticker And Append
                if (hasFailedBecauseAlreadyExists(error)) {
                    console.log('Is Duplicate!');
                    await this.companyModel.findOneAndUpdate(
                        { apidbId: secCompany.cik_str },
                        {
                            $addToSet: { ticker: secCompany.ticker },
                        },
                    );
                }
            }
        }
        return this.findAll();
    }

    async create(company: InputCompanyDto): Promise<Company> {
        const newCompany = new this.companyModel(company);
        return newCompany.save();
    }

    // Company Filings ----

    // async createCompanyFiling(id: string, filing: InputCompanyFilingDto): Promise<Company> {
    //     const company = await this.findOne(id);
    //     if (!company) {
    //         throw new NotFoundException(`Company with Id ${id} not found`);
    //     }
    //     const companyFiling = await this.companyFilingService.create(company, filing);
    //     company.filings.push(companyFiling);
    //     return company.save();
    // }

    async updateCompanyFilings(id: string): Promise<Company> {
        console.log('company service', id);
        const company = await this.findOne(id);
        if (!company) {
            throw new NotFoundException(`Company with Id ${id} not found`);
        }
        const newCompanyFilings = await this.companyFilingService.update(company);
        company.filings = company.filings.concat(newCompanyFilings);
        return company.save();
    }

    async update(id: string, company: InputCompanyDto): Promise<Company> {
        return this.companyModel.findByIdAndUpdate(id, company, { new: true }).exec();
    }

    async delete(id: string): Promise<Company> {
        return this.companyModel.findByIdAndDelete(id).exec();
    }
}
