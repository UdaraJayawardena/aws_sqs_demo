import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';
import { config } from '../config';
import { ConsumerController } from './consumer.controller';
import { MessageConsumerService } from './consumer.service';

AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: 'AKIAY7DKKEVN6NSZWQTI',
  secretAccessKey: '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',
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'My-FIFO-Queue.fifo',
          queueUrl:
            'https://sqs.ap-northeast-1.amazonaws.com/616550770011/My-FIFO-Queue.fifo',
          region: 'ap-northeast-1',
        },
      ],
      producers: [],
    }),
  ],
  controllers: [ConsumerController],
  providers: [MessageHandler, MessageConsumerService],
  exports: [MessageConsumerService],
})
export class ConsumerModule {}
