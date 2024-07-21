import { Injectable } from '@nestjs/common';
import { WorkspaceModel } from './workspace.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceDTO } from './workspace.dto';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(WorkspaceModel)
        private workspaceRepository: Repository<WorkspaceModel>,
    ) { }

    create(workspace: WorkspaceDTO): Promise<WorkspaceModel> {
        return this.workspaceRepository.save(workspace);
    }

    findAll(): Promise<WorkspaceModel[]> {
        return this.workspaceRepository.find();
    }

    findOne(id: string): Promise<WorkspaceModel> {
        return this.workspaceRepository.findOneBy({ id });
    }
}