import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import * as faker from 'faker';
import { CreateUserDto } from './dto/create-user.dto';

const oneUser = {
  username: faker.internet.userName(),
  id: faker.datatype.number(),
};

const createUserDto: CreateUserDto = {
  ...oneUser,
  password: '123456',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be save user', async () => {
    expect(await service.create(createUserDto)).toBe(oneUser);
  });
});
