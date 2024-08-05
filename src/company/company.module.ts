import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { Company, CompanySchema } from './company.model';
import { CompanyFilingModule } from './filing/company-filing.module';

@Module({
    providers: [CompanyService, CompanyResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: Company.name,
                schema: CompanySchema,
            },
        ]),
        forwardRef(() => CompanyFilingModule),
    ],
})
export class CompanyModule {}
