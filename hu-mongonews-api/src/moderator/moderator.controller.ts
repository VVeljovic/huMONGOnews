import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { Moderator } from './moderator.schema';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post()
  async create(@Body() createModeratorDto: Partial<Moderator>) {
    return await this.moderatorService.create(createModeratorDto);
  }

  @Get()
  async findAll() {
    return await this.moderatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorService.findOne(id);
  }

  @Get('byUsername/:username')
  async findOneByUsername(@Param('username') username: string) {
    return await this.moderatorService.findOneByUsername(username);
  }

  @Get('logIn/:username/:password')
  async logIn(
    @Param('username') username: string,
    @Param('password') password: string,
  ) {
    return await this.moderatorService.logIn(username, password);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModeratorDto: Partial<Moderator>,
  ) {
    return this.moderatorService.update(+id, updateModeratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderatorService.remove(+id);
  }
}
