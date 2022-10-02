import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceRepository } from './workspace.repository';
import responseMessage from '../../common/helpers/response-message';
import { IResponse } from '../../common/helpers/IResponse';
import { ParticipantRepository } from './participant.repository';
import { GetWorkspacesDto } from './dto/get-workspaces.dto';
import { GetParticipantsDto } from './dto/get-participants.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspaceRepository)
    private readonly workspaceRepository: WorkspaceRepository,
    @InjectRepository(ParticipantRepository)
    private readonly participantRepository: ParticipantRepository,
  ) {}

  async isSubDomainUnique(subDomain: string): Promise<boolean> {
    const workspace = await this.workspaceRepository.findBySubDomain(subDomain);
    return !workspace?.id;
  }

  async create(
    userId: number,
    payload: CreateWorkspaceDto,
  ): Promise<IResponse> {
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

  async findAll(query: GetWorkspacesDto): Promise<IResponse> {
    const workspaces = await this.workspaceRepository
      .createQueryBuilder('w')
      .select(`w.*, u.email as  "created_by"`)
      .innerJoin('users', 'u', ' w.user = u.id')
      .offset(query.offset)
      .limit(query.limit)
      .getRawMany();

    return responseMessage({
      data: workspaces,
    });
  }

  async findOne(id: number): Promise<IResponse> {
    const workspace = await this.workspaceRepository
      .createQueryBuilder('w')
      .select(`w.*, u.email as  "created_by"`)
      .innerJoin('users', 'u', ' w.user = u.id')
      .where({ id })
      .getRawMany();
    return responseMessage({
      data: workspace,
    });
  }

  async update(id: number, payload: UpdateWorkspaceDto): Promise<IResponse> {
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

  async remove(id: number): Promise<IResponse> {
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

  async joinToWorkspace(payload) {
    const participant = await this.participantRepository.joinToWorkspace(
      payload.workspaceId,
      payload.userId,
    );

    return responseMessage({
      message: `Join to workspace success`,
      statusCode: HttpStatus.CREATED,
      data: participant,
    });
  }

  async inviteToWorkspace(payload) {
    const participant = await this.participantRepository.inviteToWorkspace(
      payload.workspaceId,
      payload.userId,
      payload.inviterId,
    );

    return responseMessage({
      message: `User is invited`,
      statusCode: HttpStatus.CREATED,
      data: participant,
    });
  }

  async getAllParticipants(workspaceId: number, query: GetParticipantsDto) {
    const participants = await this.participantRepository
      .createQueryBuilder('p')
      .select('u.id, u.email, u.profile_image')
      .innerJoin('users', 'u', 'u.id = p.user')
      .where('p.workspace = :workspaceId', { workspaceId })
      .offset(query.offset)
      .limit(query.limit)
      .getRawMany();

    return responseMessage({
      data: participants,
    });
  }
}
