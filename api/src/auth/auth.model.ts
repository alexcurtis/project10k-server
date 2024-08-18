import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';

@ObjectType()
export class JwtSession {
    @Field()
    token: string;

    @Field(() => User)
    user: User;
}
