// book.model.ts
import { Field, HideField, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Company } from 'src/company/company.model';
import { CompanyFiling } from 'src/company/filing/company-filing.model';
import { UUIDResolver } from 'graphql-scalars';
import { Workspace } from 'src/workspace/workspace.model';

@ObjectType()
@Schema({ timestamps: true })
export class Citation extends Document {
    @Field(() => UUIDResolver, { nullable: false })
    @Prop()
    _id: Types.UUID;

    @Field(() => Workspace)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Workspace' })
    workspace: Workspace;

    @Field()
    @Prop()
    text: string;

    @Field(() => GraphQLJSONObject)
    @Prop({ type: JSON })
    range: Object;

    @Field(() => Company)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
    company: Company;

    @Field(() => CompanyFiling)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'CompanyFiling' })
    filing: CompanyFiling;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Date)
    createdAt: Date;
}

export const CitationSchema = SchemaFactory.createForClass(Citation);
