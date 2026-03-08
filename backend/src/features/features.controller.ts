import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { VoteFeatureDto } from './dto/vote-feature.dto';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.create(createFeatureDto);
  }

  @Get()
  findAll(@Query('userIdentifier') userIdentifier?: string) {
    return this.featuresService.findAll(userIdentifier);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFeatureDto) {
    return this.featuresService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body('creatorIdentifier') creatorIdentifier: string,
  ) {
    return this.featuresService.remove(id, creatorIdentifier);
  }

  @Post(':id/vote')
  vote(@Param('id') id: string, @Body() dto: VoteFeatureDto) {
    return this.featuresService.vote(id, dto);
  }
}
