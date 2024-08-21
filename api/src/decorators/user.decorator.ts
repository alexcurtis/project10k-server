import { createParamDecorator } from '@nestjs/common';

// Return The User From The Session
export const Me = createParamDecorator((_data, req) => {
    console.log('req', req);
    return req.user;
});
