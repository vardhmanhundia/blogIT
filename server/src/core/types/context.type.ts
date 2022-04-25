import {Prisma, PrismaClient, User} from "@prisma/client";

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userId: number | null;
  user?: User | null;
}
