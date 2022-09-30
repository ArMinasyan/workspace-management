import { Controller, Get, HostParam, HttpCode } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller({ host: ':workspace' })
export class WorkspacesSubRoutingController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @HttpCode(200)
  @Get()
  findOne(@HostParam() hostParams: any) {
    const splitedHostParams = hostParams?.workspace?.split('.');
    console.log(splitedHostParams);
    if (splitedHostParams[0] === 'localhost') {
      return 'http://localhost:3000/api-documenattion';
    }
    return `Your workspace is ${splitedHostParams[0]}`;
  }
}
