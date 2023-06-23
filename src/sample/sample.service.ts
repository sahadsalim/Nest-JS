import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sample } from './schema/sample.schema';
import { Model } from 'mongoose';
import { ISample } from './sample.interface';

@Injectable()
export class SampleService {
  constructor(@InjectModel(Sample.name) private SampleModel: Model<ISample>) { }

  async create(createSampleDto: CreateSampleDto) {
    const newSample = await new this.SampleModel(createSampleDto);
    return newSample.save();
  }

  async findAll() {
    const InfoData = await this.SampleModel.find();
    if (!InfoData || InfoData.length == 0) {
        throw new NotFoundException('Samples data not found!');
    }
    return InfoData;
  }

  findOne(id: number) {
    return `This action returns a #${id} sample`;
  }

  update(id: number, updateSampleDto: UpdateSampleDto) {
    return `This action updates a #${id} sample`;
  }

  remove(id: number) {
    return `This action removes a #${id} sample`;
  }
}
