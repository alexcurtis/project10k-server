import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JournalEntryService } from './journal-entry.service';
import { JournalEntryResolver } from './journal-entry.resolver';
import { JournalEntry, JournalEntrySchema } from './journal-entry.model';
import { JournalModule } from '../journal.module';

@Module({
    providers: [
        JournalEntryService,
        JournalEntryResolver
    ],
    imports: [MongooseModule.forFeature([
        {
            name: JournalEntry.name,
            schema: JournalEntrySchema,
        },
    ]),
    forwardRef(() => JournalModule)
    ],
    exports: [JournalEntryService]
})

export class JournalEntryModule { }