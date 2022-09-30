import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkspaceRepository } from "./workspace.repository";
import responseMessage from "../../common/helpers/response-message";
import { IResponse } from "../../common/helpers/IResponse";

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspaceRepository)
    private readonly workspaceRepository: WorkspaceRepository
  ) {
  }

  async isSubDomainUnique(subDomain: string): Promise<boolean> {
    const workspace = await this.workspaceRepository.findBySubDomain(subDomain);
    return !workspace?.id;
  }

  async create(
    userId: number,
    payload: CreateWorkspaceDto
  ): Promise<IResponse> {
    const isWorkspaceDomainUnique = await this.isSubDomainUnique(
      payload.subDomain
    );

    if (!isWorkspaceDomainUnique) {
      return responseMessage({
        statusCode: HttpStatus.CONFLICT,
        message: "Workspace sub domain must be a unique."
      });
    }

    const createdWorkspace = await this.workspaceRepository.createWorkspace(
      payload.name,
      payload.subDomain,
      userId
    );

    return responseMessage({
      statusCode: HttpStatus.CREATED,
      data: {
        id: createdWorkspace.id,
        name: createdWorkspace.name,
        subDomain: createdWorkspace.sub_domain
      }
    });
  }

  async findAll(): Promise<IResponse> {
    const workspaces = await this.workspaceRepository.find();
    return responseMessage({
      data: workspaces
    });
  }

  async findOne(id: number): Promise<IResponse> {
    const workspace = await this.workspaceRepository.findById(id);
    return responseMessage({
      data: workspace
    });
  }

  async update(id: number, payload: UpdateWorkspaceDto): Promise<IResponse> {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Workspace with id=${id} not found`
      });
    }

    const isWorkspaceDomainUnique = await this.isSubDomainUnique(
      payload.subDomain
    );
    if (!isWorkspaceDomainUnique) {
      return responseMessage({
        statusCode: HttpStatus.CONFLICT,
        message: "Workspace sub domain must be a unique."
      });
    }

    await this.workspaceRepository.update(id, {
      name: payload.name,
      sub_domain: payload.subDomain
    });

    return responseMessage({
      message: "Workspace is updated",
      data: {
        id,
        name: payload.name,
        subDomain: payload.subDomain
      }
    });
  }

  async remove(id: number): Promise<IResponse> {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Workspace with id=${id} not found`
      });
    }

    await this.workspaceRepository.softDelete(id);

    return responseMessage({
      message: `Workspace with id=${id} deleted`
    });
  }
}
