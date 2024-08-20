import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputCompanyDto {
    @Field()
    apidbId: string;

    @Field(() => [String])
    ticker: string[];

    @Field()
    title: string;
}
