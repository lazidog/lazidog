import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { workerServerEnvSchema } from '@lazidog/shared';
import { notificationJobSchema, queueNames, sendEmailJobSchema } from './events';

const env = workerServerEnvSchema.parse(process.env);

const connection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const workers = [
  new Worker(
    queueNames.email,
    async (job) => {
      const data = sendEmailJobSchema.parse(job.data);
      console.log(
        { queue: queueNames.email, jobId: job.id, template: data.template },
        'email job received'
      );
    },
    { connection }
  ),
  new Worker(
    queueNames.notification,
    async (job) => {
      const data = notificationJobSchema.parse(job.data);
      console.log(
        { queue: queueNames.notification, jobId: job.id, userId: data.userId, type: data.type },
        'notification job received'
      );
    },
    { connection }
  ),
  new Worker(
    queueNames.async,
    async (job) => {
      console.log({ queue: queueNames.async, jobId: job.id, name: job.name }, 'async job received');
    },
    { connection }
  ),
];

for (const worker of workers) {
  worker.on('failed', (job, error) => {
    console.error({ queue: worker.name, jobId: job?.id, error }, 'job failed');
  });
}

const shutdown = async () => {
  await Promise.all(workers.map((worker) => worker.close()));
  await connection.quit();
};

process.on('SIGTERM', () => {
  void shutdown().finally(() => process.exit(0));
});

process.on('SIGINT', () => {
  void shutdown().finally(() => process.exit(0));
});

console.log({ queues: Object.values(queueNames) }, 'worker started');
