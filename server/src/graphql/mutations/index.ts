import {AuthMutation} from "./auth.mutation";
import {PostMutation} from "./post.mutation";

export const Mutations = {
  ...AuthMutation,
  ...PostMutation,
};
