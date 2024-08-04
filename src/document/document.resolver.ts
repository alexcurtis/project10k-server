import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Document } from './document.model';
import { DocumentService } from './document.service';
import { InputDocumentDto } from './document.dto';

@Resolver(() => Document)
export class DocumentResolver {
    constructor(private readonly documentService: DocumentService) {}

    @Query(() => [Document])
    async documents(): Promise<Document[]> {
        return this.documentService.findAll();
    }

    @Query(() => Document)
    async document(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Document> {
        return this.documentService.findOne(id);
    }

    @Mutation(() => Document)
    async createDocument(
        @Args('document') document: InputDocumentDto,
    ): Promise<Document> {
        return this.documentService.create(document);
    }

    @Mutation(() => Document)
    async updateDocument(
        @Args('id', { type: () => ID }) id: string,
        @Args('document') document: InputDocumentDto,
    ): Promise<Document> {
        return this.documentService.update(id, document);
    }

    // @Mutation(() => Document)
    // async deleteDocument(
    //     @Args('id', { type: () => ID }) id: string
    // ): Promise<Document> {
    //     return this.documentService.delete(id);
    // }
}
