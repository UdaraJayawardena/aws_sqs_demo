import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ProducerController } from './producer.controller';
import { MessageProducerService } from './producer.service';
import * as AWS from 'aws-sdk';
import { config } from '../config';

AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: 'AKIAY7DKKEVN6NSZWQTI',
  secretAccessKey: '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',
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: 'My-FIFO-Queue.fifo',
          queueUrl:
            'https://sqs.ap-northeast-1.amazonaws.com/616550770011/My-FIFO-Queue.fifo',
          region: 'ap-northeast-1',
        },
      ],
    }),
  ],
  controllers: [ProducerController],
  providers: [MessageProducerService],
  exports: [MessageProducerService],
})
export class ProducerModule {}
