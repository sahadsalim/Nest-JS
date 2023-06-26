import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './entities/player.entity';
import { Model } from 'mongoose';
import { IPlayer } from './interface/player.interface';

@Injectable()
export class PlayerService {

  constructor(@InjectModel(Player.name) private PlayerModel: Model<IPlayer>) { }

  async create(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    const newPlayer = await new this.PlayerModel(createPlayerDto);
    return newPlayer.save();
  }
  async findAll(): Promise<IPlayer[]> {
    const InfoData = await this.PlayerModel.find();
    if (!InfoData || InfoData.length == 0) {
      throw new NotFoundException('Player data not found!');
    }
    return InfoData;
  }

  async findOne(InfoId: string): Promise<IPlayer> {
    const existingInfo = await this.PlayerModel.findById(InfoId).exec();
    if (!existingInfo) {
      throw new NotFoundException(`Player #${InfoId} not found`);
    }
    return existingInfo;
  }

  async findOneByName(nameValue: string) {
    const existingInfo = await this.PlayerModel.exists({ name: nameValue });
    if (existingInfo) {
      throw new NotAcceptableException(`Player already exist`);
    }
    return existingInfo ? true : false;
  }
  async update(InfoId: string, updateInfoDto: UpdatePlayerDto): Promise<IPlayer> {
    const existingInfo = await this.PlayerModel.findByIdAndUpdate(InfoId, updateInfoDto, { new: true });
    if (!existingInfo) {
      throw new NotFoundException(`Player #${InfoId} not found`);
    }
    return existingInfo;
  }

  async remove(InfoId: string): Promise<IPlayer> {
    const deletedInfo = await this.PlayerModel.findByIdAndDelete(InfoId);
    if (!deletedInfo) {
      throw new NotFoundException(`Info #${InfoId} not found`);
    }
    return deletedInfo;
  }
}
