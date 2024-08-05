import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';
import { Workspace, WorkspaceSchema } from './workspace.model';
import { JournalModule } from '../journal/journal.module';
import { AccountModule } from "src/account/account.module";

@Module({
    providers: [
        WorkspaceService,
        WorkspaceResolver
    ],
    imports: [MongooseModule.forFeature([
        {
            name: Workspace.name,
            schema: WorkspaceSchema,
        },
    ]),
    forwardRef(() => JournalModule),
    forwardRef(() => AccountModule)
    ],
    exports: [WorkspaceService]
})

export class WorkspaceModule { }