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

import { MessageConsumerService } from './consumer.service';

@ApiTags('consumer')
@Controller('sqs')
export class ConsumerController {
  constructor(
    private readonly messageConsumerService: MessageConsumerService,
  ) {}

  @ApiOperation({ summary: 'SQS Delete Message' })
  @Get('deleteMessage/:QueueUrl/:ReceiptHandle')
  deleteMessage(
    @Param('QueueUrl') QueueUrl: string,
    @Param('ReceiptHandle') ReceiptHandle: string,
  ) {
    return this.messageConsumerService.deleteMessage(QueueUrl, ReceiptHandle);
  }

  @Get('receiveMessage')
  receiveMessage() {
    return this.messageConsumerService.receiveMessage();
  }
}
