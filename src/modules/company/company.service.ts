import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyModel } from './company.model';
import { CreateCompanyDTO } from './company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyModel)
        private companyRepository: Repository<CompanyModel>
    ) { }

    async create(company: CreateCompanyDTO): Promise<CompanyModel> {
        return this.companyRepository.save(company);
    }

    findAll(): Promise<CompanyModel[]> {
        return this.companyRepository.find();
    }

    findOne(id: string): Promise<CompanyModel> {
        return this.companyRepository.findOneBy({ id });
    }   
}