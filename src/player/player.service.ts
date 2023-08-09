import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './entities/player.entity';
import { Model } from 'mongoose';
import { PlayerDocument } from './schema/player.schema';

@Injectable()
export class PlayerService {

  constructor(@InjectModel(Player.name) private PlayerModel: Model<PlayerDocument>) { }

  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerDocument> {
    const newPlayer = await new this.PlayerModel(createPlayerDto);
    return newPlayer.save();
  }
  async findAll(): Promise<PlayerDocument[]> {
    const PlayerData = await this.PlayerModel.find();
    if (!PlayerData || PlayerData.length == 0) {
      throw new NotFoundException('Player data not found!');
    }
    return PlayerData;
  }

  async findOne(PlayerId: string): Promise<PlayerDocument> {
    const existingPlayer = await this.PlayerModel.findById(PlayerId).exec();
    if (!existingPlayer) {
      throw new NotFoundException(`Player #${PlayerId} not found`);
    }
    return existingPlayer;
  }

  async findOneByName(nameValue: string) {
    const existingPlayer = await this.PlayerModel.exists({ name: nameValue });
    if (existingPlayer) {
      throw new NotAcceptableException(`Player already exist`);
    }
    return existingPlayer ? true : false;
  }
  async update(PlayerId: string, updatePlayerDto: UpdatePlayerDto): Promise<PlayerDocument> {
    const existingPlayer = await this.PlayerModel.findByIdAndUpdate(PlayerId, updatePlayerDto, { new: true });
    if (!existingPlayer) {
      throw new NotFoundException(`Player #${PlayerId} not found`);
    }
    return existingPlayer;
  }

  async remove(PlayerId: string): Promise<PlayerDocument> {
    const deletedPlayer = await this.PlayerModel.findByIdAndDelete(PlayerId);
    if (!deletedPlayer) {
      throw new NotFoundException(`Player #${PlayerId} not found`);
    }
    return deletedPlayer;
  }
}
