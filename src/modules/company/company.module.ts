import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { CompanyModel } from './company.model';

// forFeature() method to define which repositories are registered in the current scope
@Module({
    imports: [TypeOrmModule.forFeature([CompanyModel])],
    providers: [CompanyService, CompanyResolver],
    exports: [CompanyService]
})
export class CompanyModule { }
