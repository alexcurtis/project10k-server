import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { JournalModel } from './journal.model';
import { JournalService } from './journal.service';
import { UpdateJournalDTO } from './journal.dto';

@Resolver(of => JournalModel)
export class JournalResolver {
    constructor(
        @Inject(JournalService) private journalService: JournalService
    ) { }

    // @Query(returns => JournalModel)
    // async journal(@Args('id') id: string): Promise<JournalModel> {
    //     return await this.journalService.findOne(id);
    // }

    @Mutation(returns => JournalModel)
    async updateJournal(
        @Args('journal') journal: UpdateJournalDTO,
    ): Promise<JournalModel> {
        return await this.journalService.update(journal)
    }
}