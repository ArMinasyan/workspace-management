import { Controller, Get, HostParam, Redirect } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller({ path: '/', host: ':workspace' })
export class WorkspacesSubRoutingController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  // @ApiOperation({
  //   tags: ["Workspaces"]
  // })
  @Get()
  findOne(@HostParam() hostParams: any) {
    // return this.workspacesService.findOne(+id);
    const splitedHost = hostParams?.workspace?.split('.');
    if (splitedHost[0] === 'localhost') {
      Redirect('http://localhost', 200);
    }
    return splitedHost;
  }
}
