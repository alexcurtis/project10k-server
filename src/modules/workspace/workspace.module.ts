import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceModel } from './workspace.model';
import { AccountModule } from '../account/account.module';
import { CompanyModule } from '../company/company.module';
import { JournalModule } from '../journal/journal.module';

// forFeature() method to define which repositories are registered in the current scope
@Module({
    imports: [
        TypeOrmModule.forFeature([WorkspaceModel]),
        forwardRef(() => AccountModule),
        forwardRef(() => CompanyModule),
        forwardRef(() => JournalModule)
    ],
    providers: [WorkspaceService, WorkspaceResolver],
    exports: [WorkspaceService]
})
export class WorkspaceModule { }
