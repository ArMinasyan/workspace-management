import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesController } from '../src/modules/workspaces/workspaces.controller';
import { WorkspacesService } from '../src/modules/workspaces/workspaces.service';

describe('WorkspacesController', () => {
  let controller: WorkspacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspacesController],
      providers: [WorkspacesService],
    }).compile();

    controller = module.get<WorkspacesController>(WorkspacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
