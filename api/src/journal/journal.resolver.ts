import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';
import { InputJournalDto } from './journal.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Journal)
export class JournalResolver {
    constructor(private readonly journalService: JournalService) {}

    // @Query(() => [Journal])
    // async journals(): Promise<Journal[]> {
    //     return this.journalService.findAll();
    // }

    @Query(() => Journal)
    @UseGuards(JwtAuthGuard)
    async journal(@Args('id', { type: () => ID }) id: string): Promise<Journal> {
        return this.journalService.findOne(id);
    }

    @Mutation(() => Journal)
    @UseGuards(JwtAuthGuard)
    async createJournal(@Args('journal') journal: InputJournalDto): Promise<Journal> {
        return this.journalService.create(journal);
    }

    @Mutation(() => Journal)
    @UseGuards(JwtAuthGuard)
    async updateJournal(
        @Args('id', { type: () => ID }) id: string,
        @Args('journal') journal: InputJournalDto,
    ): Promise<Journal> {
        return this.journalService.update(id, journal);
    }

    @Mutation(() => Journal)
    @UseGuards(JwtAuthGuard)
    async deleteJournal(@Args('id', { type: () => ID }) id: string): Promise<Journal> {
        return this.journalService.delete(id);
    }
}
