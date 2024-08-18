import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputLoginDto {
    @Field()
    email: string;

    @Field()
    password: string;
}
