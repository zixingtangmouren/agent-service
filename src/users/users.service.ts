import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalDbService } from 'src/local-db/local-db.service';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { USER_INVITE_CODE } from './constants';

@Injectable()
export class UsersService {
  constructor(private readonly localDbService: LocalDbService) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.inviteCode !== USER_INVITE_CODE) {
      throw new BadRequestException('Invalid invite code');
    }

    return await this.localDbService.create({
      ...createUserDto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  async findAll() {
    return await this.localDbService.findAll<User>();
  }

  async findOne(id: string) {
    return await this.localDbService
      .findAll<User>()
      .then((users) => users.find((user) => user.id === id));
  }

  async findOneByUsername(username: string) {
    return await this.localDbService.findOneByKey<User>('username', username);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const orginalUser = await this.findOne(id);

    if (!orginalUser) {
      throw new NotFoundException('User not found');
    }

    return await this.localDbService.updateByKey<User>('id', {
      ...orginalUser,
      ...updateUserDto,
      updatedAt: Date.now(),
    });
  }

  async remove(id: string) {
    const orginalUser = await this.findOne(id);

    if (!orginalUser) {
      throw new NotFoundException('User not found');
    }

    return await this.localDbService.deleteByKey<User>('id', orginalUser);
  }
}
