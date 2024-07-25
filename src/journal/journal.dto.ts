import { InputType, Field } from '@nestjs/graphql';

export const defaultJournalData = {
    name: 'Untitled Journal',
    mindMapNode: {
        position: {
            x: 200,
            y: 200
        },
        edges: [{
            target: '66a2313bfd0476f3f5927b78'
        }
        ]
    }
}

@InputType()
export class InputJournalDto {
    @Field()
    name: string;
}