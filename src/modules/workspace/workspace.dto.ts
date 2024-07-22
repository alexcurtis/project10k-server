import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateWorkspaceDTO {
    @Field()
    account: string;
    @Field()
    name: string;
}