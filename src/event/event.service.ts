import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from './schema/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private EventModel: Model<EventDocument>) { }

  async create(createEventDto: CreateEventDto): Promise<EventDocument> {
    const newEvent = await new this.EventModel(createEventDto);
    return newEvent.save();
  }
  async findAll(): Promise<EventDocument[]> {
    const EventData = await this.EventModel.find().populate({ path: "players" });
    if (!EventData || EventData.length == 0) {
      throw new NotFoundException('Event data not found!');
    }
    return EventData;
  }

  async findOne(InfoId: string): Promise<EventDocument> {
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
  async update(InfoId: string, updateInfoDto: UpdateEventDto): Promise<EventDocument> {
    let existingInfo: EventDocument;
    try {
      existingInfo = await this.EventModel.findByIdAndUpdate(InfoId, updateInfoDto, { new: true });
      console.log(existingInfo);
      if (!existingInfo) {
        throw new NotFoundException(`Event #${InfoId} not found`);
      }
    } catch (error) {
      console.log(error);

    }

    return existingInfo;
  }

  async remove(InfoId: string): Promise<EventDocument> {
    const deletedInfo = await this.EventModel.findByIdAndDelete(InfoId);
    if (!deletedInfo) {
      throw new NotFoundException(`Event #${InfoId} not found`);
    }
    return deletedInfo;
  }
}