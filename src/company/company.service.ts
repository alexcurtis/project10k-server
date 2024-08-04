import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './company.model';
import { InputCompanyDto } from './company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name)
        private companyModel: Model<Company>,
    ) {}

    async findAll(): Promise<Company[]> {
        return this.companyModel.find().exec();
    }

    async findOne(id: string): Promise<Company> {
        return this.companyModel.findById(id).exec();
    }

    async create(company: InputCompanyDto): Promise<Company> {
        const newCompany = new this.companyModel(company);
        return newCompany.save();
    }

    async update(id: string, company: InputCompanyDto): Promise<Company> {
        return this.companyModel
            .findByIdAndUpdate(id, company, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Company> {
        return this.companyModel.findByIdAndDelete(id).exec();
    }
}
