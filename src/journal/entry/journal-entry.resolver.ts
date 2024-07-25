import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { JournalEntry } from './journal-entry.model';
import { JournalEntryService } from './journal-entry.service';
import { InputJournalEntryDto } from './journal-entry.dto';

@Resolver(() => JournalEntry)
export class JournalEntryResolver {
    constructor(private readonly journalEntryService: JournalEntryService) { }

    @Query(() => [JournalEntry])
    async journalEntries(): Promise<JournalEntry[]> {
        return this.journalEntryService.findAll();
    }

    @Query(() => JournalEntry)
    async journalEntry(
        @Args('id', { type: () => ID }) id: string
    ): Promise<JournalEntry> {
        return this.journalEntryService.findOne(id);
    }

    // It Might Not Ever Be Needed. 1:1 Journal - Journal Entry
    // @Mutation(() => JournalEntry)
    // async createJournalEntry(
    //     @Args('entry') entry: InputJournalEntryDto
    // ): Promise<JournalEntry> {
    //     return this.journalEntryService.create(entry);
    // }

    @Mutation(() => JournalEntry)
    async updateJournalEntry(
        @Args('id', { type: () => ID }) id: string,
        @Args('entry') entry: InputJournalEntryDto,
    ): Promise<JournalEntry> {
        return this.journalEntryService.update(id, entry);
    }

    @Mutation(() => JournalEntry)
    async deleteBook(
        @Args('id', { type: () => ID }) id: string
    ): Promise<JournalEntry> {
        return this.journalEntryService.delete(id);
    }


}