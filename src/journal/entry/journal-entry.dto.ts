import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

export const defaultJournalEntryData = {
    content: {
        type: 'doc',
        content: [{
            type: 'paragraph',
            attrs: {
                class: null,
                textAlign: 'left'
            },
            content: [{
                type: 'text',
                text: 'hello world'
            }]
        }]
    }
}

@InputType()
export class InputJournalEntryDto {
    @Field(() => GraphQLJSON)
    content: JSON;
}