import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from '../config';

import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: 'AKIAY7DKKEVN6NSZWQTI',
  secretAccessKey: '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',
});

const sqs = new AWS.SQS();

@Injectable()
export class MessageProducerService {
  constructor(private readonly sqsService: SqsService) {}

  async sendQueueMessage(message: string) {
    console.log('=== sendQueueMessage ===');
    const sendMessage = message;
    const updatedJson: any = JSON.stringify({ data: sendMessage });

    const content: any = {
      body: updatedJson,
      id: 'MESSAGE_ID_1',
      deduplicationId: 'DD_ID_1',
      groupId: 'fifo-group-1',
    };

    console.log('content => ', content);

    try {
      const result = await this.sqsService.send('My-FIFO-Queue.fifo', content);
      console.log('=== result ===');
      console.log(result);

      const reponse = JSON.parse(JSON.stringify(result));

      return reponse;
    } catch (error) {
      console.log('=== error in send message ===');
      console.error(error);
    }
  }

  async getQueueUrl(queueName: string) {
    console.log('=== getQueueUrl ===');

    try {
      const customPromise = new Promise((resolve, reject) => {
        const params = {
          QueueName: queueName,
        };

        sqs.getQueueUrl(params, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      return customPromise;
    } catch (error) {
      console.log('=== error in get queue url ===');
      console.error(error);
    }
  }

  async createQueue(queueName: string) {
    console.log('=== createQueue ===');

    try {
      const customPromise = new Promise((resolve, reject) => {
        const params = {
          QueueName: queueName,
        };

        console.log('queueName =>', queueName);

        sqs.createQueue(params, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      return customPromise;
    } catch (error) {
      console.log('=== error in get queue url ===');
      console.error(error);
    }
  }
}
