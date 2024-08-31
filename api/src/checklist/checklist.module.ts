import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CheckListService } from "./checklist.service";
import { CheckListResolver } from "./checklist.resolver";
import { CheckList, CheckListSchema } from "./checklist.model";
import { AccountModule } from "src/account/account.module";

@Module({
    providers: [CheckListService, CheckListResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: CheckList.name,
                schema: CheckListSchema,
            },
        ]),
        forwardRef(() => AccountModule),
    ],
    exports: [CheckListService],
})
export class CheckListModule {}
