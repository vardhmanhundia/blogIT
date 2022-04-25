import {Context} from "../../core/types";

export interface UserParent {
  id: number;
}

export const UserResolver = {
  user: (parent: UserParent, __: any, {userId, prisma}: Context) => {
    const isOwnProfile = parent.id === userId;

    if (isOwnProfile) {
      return prisma.post.findMany({
        where: {
          UserId: parent.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }

    return prisma.post.findMany({
      where: {
        UserId: parent.id,
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
