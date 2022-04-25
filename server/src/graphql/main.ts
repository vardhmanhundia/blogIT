import {ApolloServer} from "apollo-server";

import {values} from "lodash";
import {prisma} from "../core/database/config";
import {Context} from "../core/types/context.type";
import {AuthUtil} from "../core/utils/auth.util";
import {Mutations} from "./mutations";

import * as resolvers from "./resolvers";
import * as schemas from "./schemas";
import * as inputs from "./inputs";

export const server = new ApolloServer({
  typeDefs: [...values(schemas), ...values(inputs)],
  resolvers: {...resolvers, ...Mutations},
  context: async ({req}): Promise<Context> => {
    const userInfo = await AuthUtil.getUserFromToken(
      req.headers.authorization || ""
    );
    const user = await prisma.user.findUnique({where: {id: userInfo?.userId}});

    return {
      prisma,
      user: user,
      userId: (userInfo && userInfo.userId) || null,
    };
  },
});
