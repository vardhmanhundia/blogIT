import {Context} from "../../core/types";

export const QueryResolver = {
  posts: async (_: any, __: any, {prisma}: Context) => {
    return await prisma.post.findMany({
      where: {published: true},
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
  me: (_: any, __: any, {user}: Context) => {
    if (!user) return null;

    return user;
  },
  profile: async (
    _: any,
    {userId}: {userId: number},
    {prisma, userId: myUserId}: Context
  ) => {
    const isMyProfile = userId === myUserId;

    const createdProfile = await prisma.profile.findUnique({
      where: {UserId: userId},
      include: {User: true},
    });

    if (!createdProfile) return null;

    return {
      ...createdProfile,
      isMyProfile,
    };
  },
};
