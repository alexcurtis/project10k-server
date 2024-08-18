import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { JournalEntry } from './journal-entry.model';
import { JournalEntryService } from './journal-entry.service';
import { InputJournalEntryDto } from './journal-entry.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => JournalEntry)
export class JournalEntryResolver {
    constructor(private readonly journalEntryService: JournalEntryService) {}

    // @Query(() => [JournalEntry])
    // @UseGuards(JwtAuthGuard)
    // async journalEntries(): Promise<JournalEntry[]> {
    //     return this.journalEntryService.findAll();
    // }

    @Query(() => JournalEntry)
    @UseGuards(JwtAuthGuard)
    async journalEntry(@Args('id', { type: () => ID }) id: string): Promise<JournalEntry> {
        return this.journalEntryService.findOne(id);
    }

    @Mutation(() => JournalEntry)
    @UseGuards(JwtAuthGuard)
    async updateJournalEntry(
        @Args('id', { type: () => ID }) id: string,
        @Args('journalEntry') journalEntry: InputJournalEntryDto,
    ): Promise<JournalEntry> {
        return this.journalEntryService.update(id, journalEntry);
    }
}
