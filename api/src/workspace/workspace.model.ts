import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Account } from '../account/account.model';
import { Journal, JournalSchema } from '../journal/journal.model';
import { Company } from 'src/company/company.model';
import { CitationSchema } from 'src/citation/citation.model';

@ObjectType()
@Schema({ timestamps: true })
export class Workspace extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop({ defaultValue: 'Untitled Workspace' })
    name: string;

    @Field(() => Account)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
    account: Account;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => [Journal])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Journal' }] })
    journals: Journal[];

    @Field(() => [Company])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Company' }] })
    companies: Company[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

WorkspaceSchema.pre('findOneAndDelete', async function (next) {
    try {
        const workspaceId = this.getQuery()._id;
        // Delete All The Citations In The Workspace
        const citation = this.model.db.model('Citation', CitationSchema);
        await citation.deleteMany({ workspace: workspaceId });
        next();
    } catch (error) {
        console.error('Error while deleting citations in workspace', error);
        next();
    }
});
