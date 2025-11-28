import {BadRequestException,Injectable,NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  // OPTIONAL: list all users
  async getAllUsers() {
    return this.userRepo.find();
  }

  // 1) Create a user
  async createUser(dto: CreateCustomerDto) {
    const existing = await this.userRepo.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new BadRequestException('Username already exists.');
    }

    const user = this.userRepo.create({
      username: dto.username,
      fullName: dto.fullName,
      isActive: dto.isActive ?? false,
    });

    return this.userRepo.save(user);
  }

  // 2) Retrieve users whose full name contains a specific substring
  async findByFullNameSubstring(substring: string) {
    const sub = (substring ?? '').trim();
    if (!sub) {
      return [];
    }

    return this.userRepo.find({
      where: { fullName: ILike(`%${sub}%`) }, // ILike = case-insensitive like (Postgres)
    });
  }

  // 3) Retrieve a user based on their unique username
  async findOneByUsername(username: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  // 4) Remove a user based on their unique username
  async removeByUsername(username: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.userRepo.remove(user);
    return { message: 'User removed successfully', user };
  }
}
