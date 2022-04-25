import {Context} from "../../core/types";

export interface GetUserParentPayload {
  id: number;
  bio: string;
  UserId: number;
}

export const ProfileResolver = {
  user: (parent: GetUserParentPayload, __: any, {userId, prisma}: Context) => {
    return prisma.user.findUnique({
      where: {
        id: parent.UserId,
      },
    });
  },
};
