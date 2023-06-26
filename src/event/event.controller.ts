import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async create(@Res() response, @Body() createEventDto: CreateEventDto) {
    console.log(createEventDto)
    Object.assign(createEventDto,{"date" : new Date(createEventDto.date)});

    try {
      const check = await this.eventService.findOneByName(createEventDto.name);
      if (!check) {
        const newEvent = this.eventService.create(createEventDto);
        return response.status(HttpStatus.CREATED).json({
          message: 'Event has been created successfully',
          newEvent,
        });
      }
    } catch (err) {
      if (err.status== 406) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 406,
          message: `Error:${err.response.message}`,
          error: 'Bad Request'
        });
      }
      else {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: Event not created!',
          error: 'Bad Request'
        });
      }


    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const EventData = await this.eventService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Event  data fetched successfully',
        EventData
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get(':id')
  async findOne(@Res() response, @Param('id') EventId: string) {
    try {
      const existingEvent = await this.eventService.findOne(EventId);
      return response.status(HttpStatus.OK).json({
        message: 'Event found successfully',
        existingEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Patch(':id')
  update(@Res() response, @Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    try {
      const existingEvent = this.eventService.update(id, updateEventDto);
      return response.status(HttpStatus.OK).json({
        message: 'Event has been successfully updated',
        existingEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete(':id')
  async remove(@Res() response, @Param('id') EventId: string) {
    try {
      const deletedEvent = await this.eventService.remove(EventId);
      return response.status(HttpStatus.OK).json({
        message: 'Event deleted successfully',
        deletedEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
