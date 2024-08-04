import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputCompanyDto {
    @Field()
    externalId: string;

    @Field()
    ticker: string;

    @Field()
    title: string;
}
