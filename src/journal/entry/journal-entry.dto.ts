import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

export const defaultJournalEntryData = {
    content: { hello: "world", json: {is: "here"}}
}

@InputType()
export class InputJournalEntryDto {
    @Field(() => GraphQLJSON)
    content: JSON;
}