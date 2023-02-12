import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from '../config';

console.log('config =>', config);
@Injectable()
export class MessageHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  @SqsMessageHandler('My-FIFO-Queue.fifo', false)
  async handleMessage(message: AWS.SQS.Message) {
    console.log('=== handleMessage ===');
    console.log('message =>', message);

    const obj: any = JSON.parse(message.Body) as {
      message: string;
      date: string;
    };
    const { data } = JSON.parse(obj.Message);

    console.log('=== data ===');
    console.log(data);
  }
}
