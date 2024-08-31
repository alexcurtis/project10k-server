import { createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// Return The User From The Session
export const Me = createParamDecorator((_data, req) => {
    const ctx = GqlExecutionContext.create(req);
    const request = ctx.getContext().req;
    return request.user;
});
