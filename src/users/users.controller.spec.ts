import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as faker from 'faker';
import { CreateUserDto } from './dto/create-user.dto';

const createUserDto: CreateUserDto = {
  username: faker.internet.userName(),
  password: '123',
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createUserDto: CreateUserDto) =>
                Promise.resolve({ ...createUserDto, id: 1 }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create user', async () => {
    await controller.create(createUserDto);
    expect(await controller.create(createUserDto)).toEqual({
      ...createUserDto,
      id: 1,
    });
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should be update user', () => {});

  it('should be delete user', () => {});

  it('should be show user by id', () => {});

  it(' should be show user list', () => {});
});
