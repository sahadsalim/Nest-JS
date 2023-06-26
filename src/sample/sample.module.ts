import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sample, SampleSchema } from './schema/sample.schema';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Sample.name, schema: SampleSchema }])],
  controllers: [SampleController],
  providers: [SampleService]
})
export class SampleModule {}
