import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelRepository } from './channel.repository';
import responseMessage from '../../common/helpers/response-message';
import { IResponse } from '../../common/helpers/IResponse';
import { GetChannelsDto } from './dto/get-channels.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelRepository)
    private readonly channelRepository: ChannelRepository,
  ) {}

  async create(
    workspaceId: number,
    userId: number,
    payload: CreateChannelDto,
  ): Promise<IResponse> {
    const createdChannel = await this.channelRepository.createChannel(
      workspaceId,
      userId,
      payload,
    );
    return responseMessage({
      statusCode: HttpStatus.CREATED,
      data: createdChannel,
      message: 'Channel is created',
    });
  }

  async findAll(
    workspaceId: number,
    query: GetChannelsDto,
  ): Promise<IResponse> {
    const channels = await this.channelRepository
      .createQueryBuilder('c')
      .select(`c.*, u.email as  "created_by"`)
      .innerJoin('users', 'u', ' c.user = u.id')
      .where({ workspace: workspaceId })
      .offset(query.offset)
      .limit(query.limit)
      .getRawMany();

    return responseMessage({
      data: channels,
    });
  }

  async findOne(id: number): Promise<IResponse> {
    const channel = await this.channelRepository
      .createQueryBuilder('c')
      .select(`c.*, u.email as  "created_by"`)
      .innerJoin('users', 'u', ' c.user = u.id')
      .where({ id })
      .getRawOne();

    return responseMessage({
      data: channel,
    });
  }

  async update(id: number, payload: UpdateWorkspaceDto): Promise<IResponse> {
    const channel = await this.channelRepository.findById(id);
    if (!channel?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Channel with id=${id} not found`,
      });
    }

    await this.channelRepository.update(id, {
      name: payload.name,
    });

    return responseMessage({
      message: 'Channel is updated',
      data: {
        id,
        name: payload.name,
      },
    });
  }

  async remove(id: number): Promise<IResponse> {
    const workspace = await this.channelRepository.findById(id);
    if (!workspace?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Channel with id=${id} not found`,
      });
    }

    await this.channelRepository.softDelete(id);

    return responseMessage({
      message: `Channel with id=${id} deleted`,
    });
  }
}
