import DataLoader from 'dataloader';
import { BatchUsers } from '../types';
import { prisma } from '../database/config';
import { User } from '@prisma/client';
import { uniqBy } from 'lodash';

export const batchUsers: BatchUsers = async (ids: ReadonlyArray<number>) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids as Array<number>,
      },
    },
  });

  return uniqBy(users, (user) => user.id);
};

export const userLoader = new DataLoader<number, User>(batchUsers);
