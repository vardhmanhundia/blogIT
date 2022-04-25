import {Context} from "../../core/types";

export const QueryResolver = {
  posts: (_: any, __: any, {prisma}: Context) =>
    prisma.post.findMany({
      where: {published: true},
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    }),
  me: (_: any, __: any, {prisma, user}: Context) => {
    if (!user) return null;

    return user;
  },
  profile: (_: any, {userId}: {userId: number}, {prisma}: Context) => {
    return prisma.profile.findUnique({
      where: {UserId: userId},
      include: {User: true},
    });
  },
};
