import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { Account, AccountSchema } from './account.model';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
    providers: [
        AccountService,
        AccountResolver
    ],
    imports: [MongooseModule.forFeature([
        {
            name: Account.name,
            schema: AccountSchema,
        },
    ]),
    forwardRef(() => WorkspaceModule)
    ],
})

export class AccountModule { }