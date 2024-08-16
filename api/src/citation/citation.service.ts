import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Citation } from './citation.model';
import { InputCitationDto } from './citation.dto';

@Injectable()
export class CitationService {
    constructor(
        @InjectModel(Citation.name)
        private citationModel: Model<Citation>,
    ) {}

    async findAllOnWorkspace(workspaceId: string): Promise<Citation[]> {
        return this.citationModel.find({ workspace: workspaceId }).populate('company').populate('filing').exec();
    }

    async findOne(id: string): Promise<Citation> {
        return this.citationModel.findById(id).populate('company').populate('filing').exec();
    }

    async findAllOnFiling(filingId: string): Promise<Citation[]> {
        return this.citationModel.find({ filing: filingId }).populate('company').populate('filing').exec();
    }

    async create(citation: InputCitationDto): Promise<Citation> {
        const newCitation = new this.citationModel(citation);
        await newCitation.save();
        return newCitation.populate(['company', 'filing']);
    }

    async update(id: string, citation: InputCitationDto): Promise<Citation> {
        return this.citationModel.findByIdAndUpdate(id, citation, { new: true }).exec();
    }

    async delete(id: string): Promise<Citation> {
        return this.citationModel.findByIdAndDelete(id).exec();
    }
}
