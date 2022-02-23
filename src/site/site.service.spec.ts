import { Test, TestingModule } from '@nestjs/testing';
import { SiteService } from './site.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Users } from '../users/entities/user.entity';
import { CreateSiteDto } from './dto/create-site.dto';

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
});
