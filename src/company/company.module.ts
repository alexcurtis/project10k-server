import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { Company, CompanySchema } from './company.model';

@Module({
    providers: [CompanyService, CompanyResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: Company.name,
                schema: CompanySchema,
            },
        ]),
    ],
})
export class CompanyModule {}
