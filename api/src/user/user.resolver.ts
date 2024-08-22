import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { InputUserDto } from './user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Me } from 'src/decorators/user.decorator';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    // @Query(() => [User])
    // async users(): Promise<User[]> {
    //     return this.userService.findAll();
    // }

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    // Signed In User
    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async me(@Me() user: User): Promise<User> {
        // TODO - Me Decorator Does Not Work. For Now - Just return the same user
        return this.userService.findByEmail('alexander@localhost');
    }

    // @Mutation(() => User)
    // @UseGuards(JwtAuthGuard)
    // async createUser(@Args('user') user: InputUserDto, @Args('account') account: string): Promise<User> {
    //     return this.userService.create(user, account);
    // }
}
