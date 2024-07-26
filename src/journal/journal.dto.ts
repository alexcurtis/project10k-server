import { InputType, Field } from '@nestjs/graphql';

export const defaultJournalData = {
    name: 'Untitled Journal',
    mindMapNode: {
        position: {
            x: 200,
            y: 200
        },
        edges: []
    }
}

@InputType()
export class InputJournalDto {
    @Field()
    name: string;

    // @Field(() => String, { nullable: true })
    // // @Field()
    // optionalTest: string;
}