import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './company.model';
import { InputCompanyDto } from './company.dto';
import { CompanyFilingService } from './filing/company-filing.service';
import { InputCompanyFilingDto } from './filing/company-filing.dto';

import * as secCompanyJson from './company_tickers.json';

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

    // For Dev Purposes. Init DB With Companies From SEC Json
    async initDb(): Promise<Company[]> {
        // // CIKs are 10 digit numbers with leading zeros
        // const cikZeroPad = (cik) => String(cik).padStart(10, '0');
        for (const secCompanyIndex in secCompanyJson) {
            const secCompany = secCompanyJson[secCompanyIndex];
            const newCompany = new this.companyModel({
                externalId: secCompany.cik_str,
                ticker: secCompany.ticker,
                title: secCompany.title,
            });
            await newCompany.save();
        }
        return this.findAll();
    }

    async create(company: InputCompanyDto): Promise<Company> {
        const newCompany = new this.companyModel(company);
        return newCompany.save();
    }

    async createCompanyFiling(id: string, filing: InputCompanyFilingDto): Promise<Company> {
        const company = await this.findOne(id);
        if (!company) {
            throw new NotFoundException(`Company with Id ${id} not found`);
        }
        const companyFiling = await this.companyFilingService.create(company, filing);
        company.filings.push(companyFiling);
        return company.save();
    }

    async update(id: string, company: InputCompanyDto): Promise<Company> {
        return this.companyModel.findByIdAndUpdate(id, company, { new: true }).exec();
    }

    async delete(id: string): Promise<Company> {
        return this.companyModel.findByIdAndDelete(id).exec();
    }
}
