import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputDocumentDto {
    @Field()
    type: string;

    @Field()
    name: string;

    @Field()
    location: string;
}
