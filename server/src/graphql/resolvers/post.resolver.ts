import { userLoader } from '../../core/loaders';
import { Context } from '../../core/types';
import { GetUserParentPayload } from './profile.resolver';

export const PostResolver = {
  user: (parent: GetUserParentPayload, __: any, {prisma}: Context) => {
    return userLoader.load(parent.UserId);
    return prisma.user.findUnique({
      where: {
        id: parent.UserId,
      },
    });
  },
};
