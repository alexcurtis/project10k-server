import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputAccountDto {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    password: string;
}