import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JournalService } from './journal.service';
import { JournalResolver } from './journal.resolver';
import { Journal, JournalSchema } from './journal.model';
import { WorkspaceModule } from "src/workspace/workspace.module";

@Module({
    providers: [
        JournalService,
        JournalResolver
    ],
    imports: [MongooseModule.forFeature([
        {
            name: Journal.name,
            schema: JournalSchema,
        },
    ]),
    forwardRef(() => WorkspaceModule)
    ],
    exports: [JournalService]
})

export class JournalModule { }