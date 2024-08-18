import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { InputUserDto } from './user.dto';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    // @Query(() => [User])
    // async users(): Promise<User[]> {
    //     return this.userService.findAll();
    // }

    @Query(() => User)
    async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Mutation(() => User)
    async createUser(@Args('user') user: InputUserDto): Promise<User> {
        return this.userService.create(user);
    }
}
