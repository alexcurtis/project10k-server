import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyFilingService } from './company-filing.service';
import { CompanyFilingResolver } from './company-filing.resolver';
import { CompanyFiling, CompanyFilingSchema } from './company-filing.model';

@Module({
    providers: [CompanyFilingService, CompanyFilingResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: CompanyFiling.name,
                schema: CompanyFilingSchema,
            },
        ]),
    ],
})
export class CompanyFilingModule {}
