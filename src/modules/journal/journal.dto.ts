import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateJournalDTO {
    @Field()
    id: string;
    @Field()
    content: string;
}