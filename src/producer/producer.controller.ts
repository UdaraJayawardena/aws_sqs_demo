import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { MessageProducerService } from './producer.service';

@ApiTags('producer')
@Controller('sqs')
export class ProducerController {
  constructor(
    private readonly messageProducerService: MessageProducerService,
  ) {}

  @ApiOperation({ summary: 'SQS Send Message' })
  @Get('sendMessage/:message')
  sendMessage(@Param('message') message: string) {
    // const message = 'Message from Producer';
    return this.messageProducerService.sendQueueMessage(message);
  }

  @ApiOperation({ summary: 'Get Queue Url' })
  @Get('getQueueUrl/:queueName')
  // getQueueUrl(@Param('queueName') queueName: string) {
  getQueueUrl() {
    const queueName = 'My-FIFO-Queue.fifo';
    return this.messageProducerService.getQueueUrl(queueName);
  }

  @ApiOperation({ summary: 'Create a New Queue' })
  @Get('createQueue/:queueName')
  createQueue(@Param('queueName') queueName: string) {
    return this.messageProducerService.createQueue(queueName);
  }
}
