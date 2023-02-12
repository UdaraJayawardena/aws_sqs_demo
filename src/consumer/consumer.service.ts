import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from '../config';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: 'AKIAY7DKKEVN6NSZWQTI',
  secretAccessKey: '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',
});

const sqs = new AWS.SQS();

@Injectable()
export class MessageConsumerService {
  constructor(
    private readonly sqsService: SqsService,
    private readonly messageHandler: MessageHandler,
  ) {}

  async deleteMessage(QueueUrl: string, ReceiptHandle: string) {
    console.log('=== deleteMessage ===');

    const customPromise = new Promise((resolve, reject) => {
      // const deleteParams = {
      //   QueueUrl:
      //     'https://sqs.ap-northeast-1.amazonaws.com/616550770011/My-FIFO-Queue.fifo',
      //   ReceiptHandle:
      //     'AQEB/C6Y8OVldDcEjk3JudF5b02sXUWvpR5qXAOxSJuS9tnqmIdlvlsRGMRm1Q5/rOE6OL9e6PXjA96BOkDB7eq3KwnvddXt+J7lTr9cOj6qVZFw2SwVwq5gC6cnq2bRl7XFKlMGlsPKgV/OXMzBoFR1XtjLhMQ/eYijI0SvcG0Iswp6tF0ZJHckgDYFai3DTpZbfoBt1BNFte5tKJDYTEFe2kg2gEIg1yY+n71WxwuUzBb03ku5dfAS0HhgbCioisSs+n7rig+R6scByoPR9EB42i4mXc1261yD7jR6wMHRss8=',
      // };

      const deleteParams = {
        QueueUrl: QueueUrl,
        ReceiptHandle: ReceiptHandle,
      };

      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return customPromise;
  }

  async receiveMessage() {
    console.log('=== receiveMessage ===');

    const queueURL =
      'https://sqs.ap-northeast-1.amazonaws.com/616550770011/My-Queue';

    const params = {
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ['All'],
      QueueUrl: queueURL,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0,
    };

    const customPromise = new Promise((resolve, reject) => {
      console.log('params =>', params);

      sqs.receiveMessage(params, function (error, data) {
        if (error) {
          console.error('receive error', error);
          reject(error);
        } else {
          resolve(data);
        }
      });
    });

    return customPromise;
  }
}
