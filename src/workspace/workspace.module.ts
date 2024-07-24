import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';
import { Workspace, WorkspaceSchema } from './workspace.model';

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
    ],
    exports: [WorkspaceService]
})

export class WorkspaceModule { }