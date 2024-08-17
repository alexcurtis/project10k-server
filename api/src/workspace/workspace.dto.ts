import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class InputWorkspaceDto {
    @Field()
    name: string;

    @Field(() => ID, { nullable: true })
    account: Types.ObjectId;
}
