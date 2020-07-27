import { Controller, Logger, Post, Body } from '@nestjs/common';
import { MathService } from './math.service';
import { GrpcMethod } from '@nestjs/microservices';

interface INumberArray {
  data: number[]
}

export interface ISumOfNumberArray {
  sum: number
}

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  // Inject the math service
  constructor(private mathService: MathService) {}

  @GrpcMethod('AppController', 'Accumulate')
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray  {
    this.logger.log('Adding first ' + numberArray.data.toString()); // Log something on every call
    return {sum: this.mathService.accumulate(numberArray.data)}; // use math service to calc result & return
  }
}
