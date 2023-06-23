import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! fdgfdg';
  }
  findOne(id:number):string{
    return `return result for id - ${id}`;
  }
}
