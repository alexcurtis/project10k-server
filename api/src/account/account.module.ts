import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountService } from "./account.service";
import { AccountResolver } from "./account.resolver";
import { Account, AccountSchema } from "./account.model";
import { WorkspaceModule } from "../workspace/workspace.module";
import { UserModule } from "src/user/user.module";
import { CheckListModule } from "src/checklist/checklist.module";

@Module({
    providers: [AccountService, AccountResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: Account.name,
                schema: AccountSchema,
            },
        ]),
        forwardRef(() => WorkspaceModule),
        forwardRef(() => UserModule),
        forwardRef(() => CheckListModule),
    ],
})
export class AccountModule {}
