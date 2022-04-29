import {PostResolver} from "./post.resolver";
import {ProfileResolver} from "./profile.resolver";
import {QueryResolver} from "./query.resolver";
import {UserResolver} from "./user.resolver";

export const resolvers = {
  ...QueryResolver,
  ...ProfileResolver,
  ...PostResolver,
  ...UserResolver,
};
