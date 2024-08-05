import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyFiling } from './company-filing.model';
import { InputCompanyFilingDto } from './company-filing.dto';
import { Company } from '../company.model';

@Injectable()
export class CompanyFilingService {
    constructor(
        @InjectModel(CompanyFiling.name)
        private companyFilingModel: Model<CompanyFiling>,
    ) {}

    async findAll(): Promise<CompanyFiling[]> {
        return this.companyFilingModel.find().exec();
    }

    async findOne(id: string): Promise<CompanyFiling> {
        return this.companyFilingModel.findById(id).exec();
    }

    async create(company: Company, filing: InputCompanyFilingDto): Promise<CompanyFiling> {
        const companyFiling = new this.companyFilingModel({ ...filing, company });
        return companyFiling.save();
    }

    async update(id: string, companyFiling: InputCompanyFilingDto): Promise<CompanyFiling> {
        return this.companyFilingModel.findByIdAndUpdate(id, companyFiling, { new: true }).exec();
    }

    async delete(id: string): Promise<CompanyFiling> {
        return this.companyFilingModel.findByIdAndDelete(id).exec();
    }
}
