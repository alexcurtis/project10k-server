import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitationService } from './citation.service';
import { CitationResolver } from './citation.resolver';
import { Citation, CitationSchema } from './citation.model';

@Module({
    providers: [CitationService, CitationResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: Citation.name,
                schema: CitationSchema,
            },
        ]),
    ],
    exports: [CitationService],
})
export class CitationModule {}
