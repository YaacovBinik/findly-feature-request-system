import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { VoteFeatureDto } from './dto/vote-feature.dto';

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

  async findAll(userIdentifier?: string) {
    const features = await this.prisma.feature.findMany({
      include: {
        votes: true,
        _count: {
          select: {
            votes: true,
          },
        },
      },
    });

    return features.map((feature) => ({
      id: feature.id,
      title: feature.title,
      description: feature.description,
      createdAt: feature.createdAt,
      updatedAt: feature.updatedAt,
      votes: feature._count.votes,
      likedByUser: userIdentifier
        ? feature.votes.some((vote) => vote.userIdentifier === userIdentifier)
        : false,
      isOwner: userIdentifier
        ? feature.creatorIdentifier === userIdentifier
        : false,
    }));
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

  async vote(featureId: string, dto: VoteFeatureDto) {
    const feature = await this.prisma.feature.findUnique({
      where: { id: featureId },
    });

    if (!feature) {
      throw new NotFoundException('ההצעה לפיצ׳ר לא נמצאה');
    }

    if (feature.creatorIdentifier === dto.userIdentifier) {
      throw new ForbiddenException('לא ניתן לתת לייק להצעה שיצרת');
    }

    const existingVote = await this.prisma.vote.findFirst({
      where: {
        featureId,
        userIdentifier: dto.userIdentifier,
      },
    });

    if (existingVote) {
      await this.prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      return {
        liked: false,
        message: 'הלייק הוסר',
      };
    }

    await this.prisma.vote.create({
      data: {
        featureId,
        userIdentifier: dto.userIdentifier,
      },
    });

    return {
      liked: true,
      message: 'הלייק נוסף',
    };
  }
}
