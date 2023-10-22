import { Client, Connection } from '@temporalio/client';
import { startProcureProcess } from '../../temporal/src/workflow';
import { PrismaClient } from 'prisma/prisma-client';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

// npx tsx ./temporal/src/manualStart.ts

const startMultipleWorkflows = async (count: number) => {
  const prismaClient = new PrismaClient();
  const connection = await Connection.connect({});
  const client = new Client({ connection });
  const company = await prismaClient.company.findFirst();

  if (company) {
    Array(count)
      .fill({})
      .forEach(async (_, i) => {
        try {
          const lotId = uuidv4();
          const result = await client.workflow.start(startProcureProcess, {
            workflowId: lotId,
            args: [
              {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                duration: '60 sec',
                lotId,
                companyId: company.id,
              },
            ],
            taskQueue: 'start-procur',
          });

          console.log('workflow ' + i + ' started: ' + result.workflowId);

          return result.workflowId;
        } catch (e) {
          return new Error('Failed to start procure workflow');
        }
      });
  }
};

startMultipleWorkflows(10);
