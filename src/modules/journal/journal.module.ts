import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalResolver } from './journal.resolver';
import { JournalModel } from './journal.model';

// forFeature() method to define which repositories are registered in the current scope
@Module({
    imports: [TypeOrmModule.forFeature([JournalModel])],
    providers: [JournalService, JournalResolver],
    exports: [JournalService]
})
export class JournalModule { }
