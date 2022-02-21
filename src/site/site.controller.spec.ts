import { Test, TestingModule } from '@nestjs/testing';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';

describe('SiteController', () => {
  let controller: SiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteController],
      providers: [
        {
          provide: SiteService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createSiteDto: CreateSiteDto) =>
                Promise.resolve({ id: 'number', ...createSiteDto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<SiteController>(SiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create user', async () => {
    const createdSite: CreateSiteDto = {
      title: 'new site',
      url: 'http://localhost',
      description: 'is a new site',
      isActive: true,
    };
    await expect(controller.create(createdSite)).resolves.toEqual({
      id: 'number',
      ...createdSite,
    });
  });
});
