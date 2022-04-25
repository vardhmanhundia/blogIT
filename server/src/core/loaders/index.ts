import {User} from "@prisma/client";
import DataLoader from "dataloader";
import {prisma} from "../database/config";
import * as _ from "lodash";

type BatchUsers = (
  ids: ReadonlyArray<number>
) => PromiseLike<ArrayLike<User | Error>>;
export const batchUsers: BatchUsers = async (ids: ReadonlyArray<number>) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids as Array<number>,
      },
    },
  });

  return _.uniqBy(users, (user) => user.id);
};

export const userLoader = new DataLoader<number, User>(batchUsers);
