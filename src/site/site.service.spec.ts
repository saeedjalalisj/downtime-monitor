import { Test, TestingModule } from '@nestjs/testing';
import { SiteService } from './site.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Users } from '../users/entities/user.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

describe('SiteService', () => {
  let service: SiteService;
  const userId = 1;
  const createSideDto: CreateSiteDto = {
    title: '',
    url: '',
    isActive: true,
  };
  const oneSite = {
    title: '',
    url: '',
    isActive: true,
    id: 1,
    userId: new Users(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SiteService,
        {
          provide: getRepositoryToken(Site),
          useValue: {
            create: jest.fn().mockReturnValue(oneSite),
            save: jest.fn().mockReturnValue(oneSite),
            update: jest.fn().mockReturnValue(true),
            find: jest.fn().mockReturnValue([oneSite]),
            delete: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<SiteService>(SiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create new site', async () => {
    await expect(service.create(createSideDto, userId)).resolves.toEqual(
      oneSite,
    );
  });

  it('should be update site', async () => {
    const siteId = 1;
    const userId = 1;
    const updateSiteDto: UpdateSiteDto = createSideDto;
    await expect(
      service.update(siteId, updateSiteDto, userId),
    ).resolves.toEqual(true);
  });

  it('should be show sites list', async () => {
    await expect(service.findAll()).resolves.toEqual([oneSite]);
  });

  it('it should be remove a site', async () => {
    const siteId = 1;
    const userId = 1;
    await expect(service.remove(siteId, userId)).resolves.toEqual(true);
  });
});
