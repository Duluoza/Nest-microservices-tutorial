import { Controller, Logger, Post, Body, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';
import { IGrpcService } from './grpc.interfaces';

@Controller()
export class AppController implements OnModuleInit {
  // Create a logger instance
  private logger = new Logger('AppController');

 @Client(microserviceOptions)
 private client: ClientGrpc

 private grpcService: IGrpcService

 onModuleInit() {
   this.grpcService = this.client.getService<IGrpcService>('AppController')
 }

  // Map the 'POST /add' route to this method
  @Post('add')
  // Define the logic to be executed
  async accumulate(@Body('data') data: number[])  {
    this.logger.log('Adding second ' + data.toString()); // Log something on every call
    return this.grpcService.accumulate({ data }); // use math service to calc result & return
  }
}
