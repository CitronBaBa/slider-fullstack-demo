import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '~/prisma/prisma.module';
import { ComponentService } from './component.service';

describe('ComponentService', () => {
  let service: ComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<ComponentService>(ComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
