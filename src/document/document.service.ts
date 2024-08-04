import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './document.model';
import { InputDocumentDto } from './document.dto';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document.name)
        private documentModel: Model<Document>,
    ) {}

    async findAll(): Promise<Document[]> {
        return this.documentModel.find().exec();
    }

    async findOne(id: string): Promise<Document> {
        return this.documentModel.findById(id).exec();
    }

    async create(document: InputDocumentDto): Promise<Document> {
        const newDocument = new this.documentModel(document);
        return newDocument.save();
    }

    async update(id: string, document: InputDocumentDto): Promise<Document> {
        return this.documentModel
            .findByIdAndUpdate(id, document, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Document> {
        return this.documentModel.findByIdAndDelete(id).exec();
    }
}
