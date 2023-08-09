import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
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
        const newPlayer = this.playerService.create(createPlayerDto);
        return response.status(HttpStatus.CREATED).json({
          message: 'Player has been created successfully',
          newPlayer,
        });
      }
    } catch (err) {
      if (err.status == 406) {
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
      const PlayerData = await this.playerService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Player  data fetched successfully',
        PlayerData
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get(':id')
  async findOne(@Res() response, @Param('id') PlayerId: string) {
    try {
      const existingPlayer = await this.playerService.findOne(PlayerId);
      return response.status(HttpStatus.OK).json({
        message: 'Player found successfully',
        existingPlayer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Patch(':id')
  update(@Res() response, @Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    try {
      const existingPlayer = this.playerService.update(id, updatePlayerDto);
      return response.status(HttpStatus.OK).json({
        message: 'Player has been successfully updated',
        existingPlayer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete(':id')
  async remove(@Res() response, @Param('id') PlayerId: string) {
    try {
      const deletedPlayer = await this.playerService.remove(PlayerId);
      return response.status(HttpStatus.OK).json({
        message: 'Player deleted successfully',
        deletedPlayer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
