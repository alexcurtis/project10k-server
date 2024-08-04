import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { Document, DocumentSchema } from './document.model';

@Module({
    providers: [DocumentService, DocumentResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: Document.name,
                schema: DocumentSchema,
            },
        ]),
    ],
})
export class DocumentModule {}
