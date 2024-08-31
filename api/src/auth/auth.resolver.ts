import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { InputLoginDto } from "./auth.dto";
import { JwtSession } from "./auth.model";

@Resolver(() => JwtSession)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => JwtSession)
    async login(@Args("login", { type: () => InputLoginDto }) login: InputLoginDto): Promise<JwtSession> {
        return this.authService.login(login);
    }
}
