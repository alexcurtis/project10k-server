import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceModel } from './workspace.model';

// forFeature() method to define which repositories are registered in the current scope
@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceModel])],
  providers: [WorkspaceService, WorkspaceResolver],
  exports: [WorkspaceService]
})
export class WorkspaceModule {}
