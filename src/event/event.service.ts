import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEvent } from './interface/event.interface';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private EventModel: Model<IEvent>) { }

  async create(createEventDto: CreateEventDto): Promise<IEvent> {
    console.log(createEventDto)
    const newEvent = await new this.EventModel(createEventDto);
    return newEvent.save();
  }
  async findAll(): Promise<IEvent[]> {
    const InfoData = await this.EventModel.find();
    if (!InfoData || InfoData.length == 0) {
      throw new NotFoundException('Event data not found!');
    }
    return InfoData;
  }

  async findOne(InfoId: string): Promise<IEvent> {
    const existingInfo = await this.EventModel.findById(InfoId).exec();
    if (!existingInfo) {
      throw new NotFoundException(`Event #${InfoId} not found`);
    }
    return existingInfo;
  }

  async findOneByName(nameValue: string) {
    const existingInfo = await this.EventModel.exists({ name: nameValue });
    if (existingInfo) {
      throw new NotAcceptableException(`Event already exist`);
    }
    return existingInfo ? true : false;
  }
  async update(InfoId: string, updateInfoDto: UpdateEventDto): Promise<IEvent> {
    const existingInfo = await this.EventModel.findByIdAndUpdate(InfoId, updateInfoDto, { new: true });
    if (!existingInfo) {
      throw new NotFoundException(`Event #${InfoId} not found`);
    }
    return existingInfo;
  }

  async remove(InfoId: string): Promise<IEvent> {
    const deletedInfo = await this.EventModel.findByIdAndDelete(InfoId);
    if (!deletedInfo) {
      throw new NotFoundException(`Info #${InfoId} not found`);
    }
    return deletedInfo;
  }
}