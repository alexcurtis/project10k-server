import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalService } from './journal.service';
import { JournalResolver } from './journal.resolver';
import { Journal, JournalSchema } from './journal.model';
import { WorkspaceModule } from '../workspace/workspace.module';
import { JournalEntryModule } from './entry/journal-entry.module';
import { CompanyModule } from 'src/company/company.module';
import { CompanyFilingModule } from 'src/company/filing/company-filing.module';
import { CitationModule } from 'src/citation/citation.module';

@Module({
    providers: [JournalService, JournalResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: Journal.name,
                schema: JournalSchema,
            },
        ]),
        forwardRef(() => WorkspaceModule),
        forwardRef(() => JournalEntryModule),
        forwardRef(() => CompanyModule),
        forwardRef(() => CompanyFilingModule),
        forwardRef(() => CitationModule),
    ],
    exports: [JournalService],
})
export class JournalModule {}
