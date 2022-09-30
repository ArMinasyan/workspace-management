import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceRepository } from './workspace.repository';
import responseMessage from '../../common/helpers/response-message';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspaceRepository)
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async isSubDomainUnique(subDomain: string) {
    const workspace = await this.workspaceRepository.findBySubDomain(subDomain);
    return !workspace?.id;
  }

  async create(userId: number, payload: CreateWorkspaceDto) {
    const isWorkspaceDomainUnique = await this.isSubDomainUnique(
      payload.subDomain,
    );

    if (!isWorkspaceDomainUnique) {
      return responseMessage({
        statusCode: HttpStatus.CONFLICT,
        message: 'Workspace sub domain must be a unique.',
      });
    }

    const createdWorkspace = await this.workspaceRepository.createWorkspace(
      payload.name,
      payload.subDomain,
      userId,
    );

    return responseMessage({
      statusCode: HttpStatus.CREATED,
      data: {
        id: createdWorkspace.id,
        name: createdWorkspace.name,
        subDomain: createdWorkspace.sub_domain,
      },
    });
  }

  findAll() {
    return this.workspaceRepository.find();
  }

  findOne(id: number) {
    return this.workspaceRepository.findById(id);
  }

  async update(id: number, payload: UpdateWorkspaceDto) {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Workspace with id=${id} not found`,
      });
    }

    const isWorkspaceDomainUnique = await this.isSubDomainUnique(
      payload.subDomain,
    );
    if (!isWorkspaceDomainUnique) {
      return responseMessage({
        statusCode: HttpStatus.CONFLICT,
        message: 'Workspace sub domain must be a unique.',
      });
    }

    await this.workspaceRepository.update(id, {
      name: payload.name,
      sub_domain: payload.subDomain,
    });

    return responseMessage({
      message: 'Workspace is updated',
      data: {
        id,
        name: payload.name,
        subDomain: payload.subDomain,
      },
    });
  }

  async remove(id: number) {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Workspace with id=${id} not found`,
      });
    }

    await this.workspaceRepository.softDelete(id);

    return responseMessage({
      message: `Workspace with id=${id} deleted`,
    });
  }
}
