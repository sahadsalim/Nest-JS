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
    console.log(createEventDto)
    const newEvent = await new this.EventModel(createEventDto);
    console.log("new event",newEvent);
    
    return newEvent.save();
  }
  async findAll(): Promise<EventDocument[]> {
    const InfoData = await this.EventModel.find().populate({path:"players"});
    console.log(InfoData);
    
    if (!InfoData || InfoData.length == 0) {
      throw new NotFoundException('Event data not found!');
    }
    return InfoData;
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
    let existingInfo:EventDocument;
    console.log("updateInfoDto", updateInfoDto);
    try {
      existingInfo= await this.EventModel.findByIdAndUpdate(InfoId, updateInfoDto, { new: true });
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
      throw new NotFoundException(`Info #${InfoId} not found`);
    }
    return deletedInfo;
  }
}