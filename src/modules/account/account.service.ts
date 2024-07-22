import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountModel } from './account.model';
import { AccountDTO } from './account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountModel)
        private accountsRepository: Repository<AccountModel>
    ) { }

    create(account: AccountDTO): Promise<AccountModel> {
        return this.accountsRepository.save(account);
    }

    findAll(): Promise<AccountModel[]> {
        return this.accountsRepository.find();
    }

    findOne(id: string): Promise<AccountModel> {
        return this.accountsRepository.findOneBy({ id });
    }

}