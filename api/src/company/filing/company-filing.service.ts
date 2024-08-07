import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyFiling } from './company-filing.model';
import { InputCompanyFilingDto } from './company-filing.dto';
import { Company } from '../company.model';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// TODO - USE USSEC INTERFACE
interface IFiling {
    apidbId: string;
    form: string;
    name: string;
    period: string;
    filedOn: string;
    format: string;
    location: string;
}

@Injectable()
export class CompanyFilingService {
    constructor(
        @InjectModel(CompanyFiling.name)
        private companyFilingModel: Model<CompanyFiling>,
        @Inject('USSEC') private readonly ussecProxy: ClientProxy,
    ) {}

    async findAll(companyId: string): Promise<CompanyFiling[]> {
        return this.companyFilingModel.find({ company: companyId }).exec();
    }

    async findOne(id: string): Promise<CompanyFiling> {
        return this.companyFilingModel.findById(id).exec();
    }

    async create(company: Company, filing: IFiling): Promise<CompanyFiling> {
        const companyFiling = new this.companyFilingModel({ ...filing, company });
        return companyFiling.save();
    }

    // async update(id: string, companyFiling: InputCompanyFilingDto): Promise<CompanyFiling> {
    //     return this.companyFilingModel.findByIdAndUpdate(id, companyFiling, { new: true }).exec();
    // }

    // Update From External Provider
    async update(company: Company): Promise<CompanyFiling[]> {
        const { externalId } = company;
        const filings = await firstValueFrom(
            this.ussecProxy.send<IFiling[]>({ cmd: 'company:filings:get' }, { company: externalId }),
        );

        // Only Pass Back Newly Created Filings
        const newFillings: CompanyFiling[] = [];
        await Promise.all(
            filings.map(async (filing) => {
                try {
                    const newFiling = await this.companyFilingModel.create(filing);
                    newFillings.push(newFiling);
                } catch (error) {
                    if (error.code === 11000) {
                        // Duplicate key error, skip this filing
                        console.log(`Duplicate key error for apidbId: ${filing.apidbId}`);
                    } else {
                        // Handle other errors if necessary
                        console.error('Error creating filing:', error);
                    }
                }
            }),
        );
        return newFillings;
    }

    async delete(id: string): Promise<CompanyFiling> {
        return this.companyFilingModel.findByIdAndDelete(id).exec();
    }
}
