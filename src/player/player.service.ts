import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './entities/player.entity';
import { Model } from 'mongoose';
import { IPlayer } from './interface/player.interface';
import { PlayerDocument } from './schema/player.schema';

@Injectable()
export class PlayerService {

  constructor(@InjectModel(Player.name) private PlayerModel: Model<PlayerDocument>) { }

  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerDocument> {
    const newPlayer = await new this.PlayerModel(createPlayerDto);
    return newPlayer.save();
  }
  async findAll(): Promise<PlayerDocument[]> {
    const InfoData = await this.PlayerModel.find();
    if (!InfoData || InfoData.length == 0) {
      throw new NotFoundException('Player data not found!');
    }
    return InfoData;
  }

  async findOne(InfoId: string): Promise<PlayerDocument> {
    console.log("InfoId",InfoId);
    
    const existingInfo = await this.PlayerModel.findById(InfoId).exec();
    if (!existingInfo) {
      throw new NotFoundException(`Player #${InfoId} not found`);
    }
    return existingInfo;
  }

  async findOneByName(nameValue: string) {
    console.log(nameValue);
    
    const existingInfo = await this.PlayerModel.exists({ name: nameValue });
    if (existingInfo) {
      throw new NotAcceptableException(`Player already exist`);
    }
    return existingInfo ? true : false;
  }
  async update(InfoId: string, updateInfoDto: UpdatePlayerDto): Promise<PlayerDocument> {
    const existingInfo = await this.PlayerModel.findByIdAndUpdate(InfoId, updateInfoDto, { new: true });
    if (!existingInfo) {
      throw new NotFoundException(`Player #${InfoId} not found`);
    }
    return existingInfo;
  }

  async remove(InfoId: string): Promise<PlayerDocument> {
    const deletedInfo = await this.PlayerModel.findByIdAndDelete(InfoId);
    if (!deletedInfo) {
      throw new NotFoundException(`Info #${InfoId} not found`);
    }
    return deletedInfo;
  }
}
