import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { AccountModel } from './account.model';
import { WorkspaceModule } from '../workspace/workspace.module';

// forFeature() method to define which repositories are registered in the current scope
@Module({
  imports: [TypeOrmModule.forFeature([AccountModel]), forwardRef(() => WorkspaceModule)],
  providers: [AccountService, AccountResolver],
  exports: [AccountService]
})
export class AccountModule {}
