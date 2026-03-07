import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    return this.prisma.feature.create({
      data: {
        title: createFeatureDto.title,
        description: createFeatureDto.description,
        email: createFeatureDto.email,
        creatorIdentifier: createFeatureDto.creatorIdentifier,
      },
    });
  }

  async findAll() {
    return this.prisma.feature.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, dto: UpdateFeatureDto) {
    const feature = await this.prisma.feature.findUnique({
      where: { id },
    });

    if (!feature) {
      throw new NotFoundException('ההצעה לפיצ׳ר לא נמצאה');
    }

    if (feature.creatorIdentifier !== dto.creatorIdentifier) {
      throw new ForbiddenException('אין לך הרשאה לערוך הצעה זו');
    }

    return this.prisma.feature.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        email: dto.email,
      },
    });
  }

  async remove(id: string, creatorIdentifier: string) {
    const feature = await this.prisma.feature.findUnique({
      where: { id },
    });

    if (!feature) {
      throw new NotFoundException('ההצעה לפיצ׳ר לא נמצאה');
    }

    if (feature.creatorIdentifier !== creatorIdentifier) {
      throw new ForbiddenException('אין לך הרשאה למחוק הצעה זו');
    }

    return this.prisma.feature.delete({
      where: { id },
    });
  }
}
