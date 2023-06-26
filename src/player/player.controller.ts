import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Post()
  async create(@Res() response, @Body() createPlayerDto: CreatePlayerDto) {
    try {
      const check = await this.playerService.findOneByName(createPlayerDto.name);
      if (!check) {
        const newInfo = this.playerService.create(createPlayerDto);
        return response.status(HttpStatus.CREATED).json({
          message: 'Player has been created successfully',
          newInfo,
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
          message: 'Error: Player not created!',
          error: 'Bad Request'
        });
      }


    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const InfoData = await this.playerService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Info  data fetched successfully',
        InfoData
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get(':id')
  async findOne(@Res() response, @Param('id') InfoId: string) {
    try {
      const existingInfo = await this.playerService.findOne(InfoId);
      return response.status(HttpStatus.OK).json({
        message: 'Info found successfully',
        existingInfo,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Patch(':id')
  update(@Res() response, @Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    try {
      const existingInfo = this.playerService.update(id, updatePlayerDto);
      return response.status(HttpStatus.OK).json({
        message: 'Info has been successfully updated',
        existingInfo,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete(':id')
  async remove(@Res() response, @Param('id') InfoId: string) {
    try {
      const deletedInfo = await this.playerService.remove(InfoId);
      return response.status(HttpStatus.OK).json({
        message: 'Info deleted successfully',
        deletedInfo,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
