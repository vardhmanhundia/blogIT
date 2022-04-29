import {User} from "@prisma/client";

export type BatchUsers = (
  ids: ReadonlyArray<number>
) => PromiseLike<ArrayLike<User | Error>>;
