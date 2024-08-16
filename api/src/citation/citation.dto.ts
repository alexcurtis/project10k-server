import { InputType, Field, ID } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Schema, Types } from 'mongoose';

@InputType()
export class InputCitationDto {
    @Field(() => UUIDResolver, { nullable: false })
    _id: Types.UUID;

    @Field(() => ID)
    workspace: Schema.Types.ObjectId;

    @Field()
    text: string;

    @Field(() => GraphQLJSONObject)
    range: Object;

    @Field(() => ID)
    company: Schema.Types.ObjectId;

    @Field(() => ID)
    filing: Schema.Types.ObjectId;
}
