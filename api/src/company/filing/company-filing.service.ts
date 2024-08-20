import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyFiling } from './company-filing.model';
import { Company } from '../company.model';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { hasFailedBecauseAlreadyExists } from 'src/utils/mongoose';

// TODO - USE USSEC INTERFACE
interface IFiling {
    apidbId: string;
    form: string;
    name: string;
    period: string;
    filedOn: string;
    format: string;
    path: string;
    filename: string;
}

@Injectable()
export class CompanyFilingService {
    constructor(
        @InjectModel(CompanyFiling.name)
        private companyFilingModel: Model<CompanyFiling>,
        @Inject('USSEC') private readonly ussecProxy: ClientProxy,
    ) {}

    async findAll(companyId: string, forms: string[]): Promise<CompanyFiling[]> {
        const filters = forms ? { form: { $in: forms } } : undefined;
        return this.companyFilingModel
            .find({
                company: companyId,
                format: 'HTML',
                ...filters,
            })
            .exec();
    }

    async findOne(id: string): Promise<CompanyFiling> {
        return this.companyFilingModel.findById(id).exec();
    }

    async create(company: Company, filing: IFiling): Promise<CompanyFiling> {
        const companyFiling = new this.companyFilingModel({ ...filing, company });
        return companyFiling.save();
    }

    // If Filings Exist For A Company
    async exists(company: Company): Promise<CompanyFiling> {
        return this.companyFilingModel.findOne({ company }).exec();
    }

    // Update From External Provider
    async update(company: Company): Promise<CompanyFiling[]> {
        const { apidbId } = company;
        const filings = await firstValueFrom(
            this.ussecProxy.send<IFiling[]>({ cmd: 'company:filings:get' }, { company: apidbId }),
        );

        // Only Pass Back Newly Created Filings
        const newFillings: CompanyFiling[] = [];
        await Promise.all(
            filings.map(async (filing) => {
                try {
                    const newFiling = await this.companyFilingModel.create({
                        ...filing,
                        company,
                    });
                    newFillings.push(newFiling);
                } catch (error) {
                    // Filing Already Exists In DB
                    if (hasFailedBecauseAlreadyExists(error)) {
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
