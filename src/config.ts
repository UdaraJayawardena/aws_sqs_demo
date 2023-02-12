// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const config = {
  TEST_QUEUE: 'Express-Queue',
  TEST_QUEUE_URL:
    'https://sqs.ap-northeast-1.amazonaws.com/616550770011/Express-Queue',
  AWS_REGION: 'ap-northeast-1',
  ACCESS_KEY_ID: 'AKIAY7DKKEVN6NSZWQTI',
  SECRET_ACCESS_KEY: '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',
  FIFO_URL:
    'https://sqs.ap-northeast-1.amazonaws.com/616550770011/My-FIFO-Queue.fifo',
};
