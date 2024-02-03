import { Injectable } from '@nestjs/common';
import { Moderator } from './moderator.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectModel(Moderator.name) private moderatorModel: Model<Moderator>,
  ) {}

  async create(createModeratorDto: Partial<Moderator>) {
    const createdModerator = new this.moderatorModel(createModeratorDto);
    return await createdModerator.save();
  }

  async findAll() {
    return await this.moderatorModel.find();
  }

  async findOne(id: string) {
    return await this.moderatorModel.findById(id);
  }

  async findOneByUsername(username: string) {
    return await this.moderatorModel.findOne({ username });
  }

  async logIn(username: string, password: string) {
    const moderator = await this.findOneByUsername(username);

    if (!moderator)
      return {
        message: `Username "${username}" not found!`,
        success: false,
        moderator: undefined,
      };

    if (moderator.password !== password)
      return {
        message: 'Incorrect password!',
        success: false,
        moderator: undefined,
      };

    return {
      message: `Log in successful. Welcome ${moderator.username}`,
      success: true,
      moderator: moderator,
    };
  }

  update(id: number, updateModeratorDto: Partial<Moderator>) {
    return `This action updates a #${id} moderator`;
  }

  remove(id: number) {
    return `This action removes a #${id} moderator`;
  }
}
