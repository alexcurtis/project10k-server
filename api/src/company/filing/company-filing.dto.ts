import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputCompanyFilingDto {
    @Field()
    apidbId: string;

    @Field()
    type: string;

    @Field()
    name: string;

    @Field()
    period: Date;

    @Field()
    filedOn: Date;

    @Field()
    format: string;

    @Field()
    path: string;

    @Field()
    filename: string;
}
