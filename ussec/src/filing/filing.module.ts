import { Module } from "@nestjs/common";
import { FilingController } from "./filing.controller";
import { FilingService } from "./filing.service";
import { ApidbModule } from "src/apidb/apidb.module";

@Module({
    controllers: [FilingController],
    providers: [FilingService],
    imports: [ApidbModule],
})
export class FilingModule {}
