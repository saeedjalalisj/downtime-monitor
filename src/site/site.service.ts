import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private readonly siteRepository: Repository<Site>,
  ) {}
  async create(createSiteDto: CreateSiteDto, userId: number) {
    try {
      const site = new Site();
      site.userId = userId;
      site.title = createSiteDto.title;
      site.url = createSiteDto.url;
      site.description = createSiteDto.description;
      site.isActive = createSiteDto.isActive;
      return await this.siteRepository.save(site);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Site[]> {
    try {
      return await this.siteRepository.find();
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  async update(id: number, updateSiteDto: UpdateSiteDto, userId: number) {
    try {
      return await this.siteRepository.update(
        { id, userId },
        { ...updateSiteDto },
      );
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number, userId: number) {
    try {
      return await this.siteRepository.delete({ id, userId });
    } catch (err) {
      throw err;
    }
  }
}
