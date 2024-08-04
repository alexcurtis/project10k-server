import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputCompanyFilingDto {
    @Field()
    externalId: string;

    @Field()
    type: string;

    @Field()
    name: string;

    @Field()
    period: Date;

    @Field()
    filedOn: Date;
}
