import { Test, TestingModule } from '@nestjs/testing';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

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
            save: jest
              .fn()
              .mockImplementation((createSiteDto: CreateSiteDto) =>
                Promise.resolve({ id: 'number', ...createSiteDto }),
              ),
            update: jest
              .fn()
              .mockImplementation(
                (siteId, updateSiteDto: UpdateSiteDto, userId) =>
                  Promise.resolve({ id: 'number', ...updateSiteDto }),
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
    const userId = 1;
    await expect(controller.create(createdSite, userId)).resolves.toEqual({
      id: 'number',
      ...createdSite,
    });
  });

  it('shuold be update user', async () => {
    const updateSiteDto: UpdateSiteDto = {
      title: 'new site',
      url: 'http://localhost',
      description: 'is a new site',
      isActive: true,
    };
    const userId = 1;
    const siteId = '1';
    await expect(
      controller.update(siteId, updateSiteDto, userId),
    ).resolves.toEqual({
      id: 'number',
      ...updateSiteDto,
    });
  });
});
