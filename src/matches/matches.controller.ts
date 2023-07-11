import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { response } from 'express';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  @Post()
  create(@Body() createMatchDto: CreateMatchDto,@Res() response) {
    try{
      const newEvent = this.matchesService.createMatch(createMatchDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Match has been created successfully',
        newEvent,
      });
    }catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 406,
        message: `Error:${err.response.message}`,
        error: 'Bad Request'
      });
    }

  }

  @Get()
  findAll() {
    return this.matchesService.getAllMatchs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.getMatch(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.updateMatch(id, updateMatchDto);
  }
  @Get('/event/:id')
  findEventMatches(@Param('id') eventId: string) {
    return this.matchesService.getMatchesOfEvent(eventId);
  }
  getMatchesOfEvent
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchesService.deleteMatch(id);
  }
}
