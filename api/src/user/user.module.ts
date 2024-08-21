import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.model';
import { AccountModule } from 'src/account/account.module';

@Module({
    providers: [UserService, UserResolver],
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        forwardRef(() => AccountModule),
    ],
    exports: [UserService],
})
export class UserModule {}
