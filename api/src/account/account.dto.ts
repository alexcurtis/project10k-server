import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputAccountDto {
    @Field()
    name: string;
}
