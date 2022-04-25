import {Context} from "../../core/types";
import {PostArgs, PostPayloadType} from "../../core/types/post.type";

export const PostMutation = {
  postCreate: async (
    _: any,
    {post}: PostArgs,
    {prisma, userId}: Context
  ): Promise<PostPayloadType> => {
    const {title, content} = post;
    if (!title || !content) {
      return {
        userErrors: [{message: "You must provide title and content"}],
      };
    }

    if (!userId) {
      return {
        userErrors: [{message: "Forbidden Access(unauthorized)"}],
      };
    }

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        UserId: userId,
      },
    });

    if (!createdPost) {
      return {
        userErrors: [{message: "Unable to create post"}],
      };
    }

    return {
      post: createdPost,
    };
  },

  postUpdate: async (
    _: any,
    {id, post}: PostArgs,
    {prisma, userId}: Context
  ) => {
    if (!userId) {
      return {
        userErrors: [{message: "Forbidden Access(unauthorized)"}],
      };
    }

    const {title, content} = post;
    if (!title || !content) {
      return {
        userErrors: [{message: "Need atleast one field to update"}],
      };
    }

    const existingPost = await prisma.post.findUnique({where: {id: id}});
    if (!existingPost) {
      return {
        userErrors: [{message: "Requested post was not found in the database"}],
      };
    }

    if (existingPost.UserId !== userId) {
      return {
        userErrors: [{message: "User Unauthorized"}],
      };
    }

    const updatedPost = await prisma.post.update({
      where: {id: id},
      data: post,
    });

    return {
      post: updatedPost,
    };
  },
  postDelete: async (_: any, {id}: {id: number}, {prisma, userId}: Context) => {
    const existingPost = await prisma.post.findUnique({where: {id: id}});
    if (!existingPost) {
      return {
        userErrors: [{message: `Requested post was not found in the database`}],
      };
    }

    if (existingPost.UserId !== userId) {
      return {
        userErrors: [{message: "User UnAuthorized"}],
      };
    }

    const deletePost = await prisma.post.delete({where: {id: id}});

    return {post: deletePost};
  },
  postPublish: (_: any, {id}: {id: number}, context: Context) =>
    PostMutation.postUpdate(_, {id, post: {published: true}}, context),
  postUnPublish: (_: any, {id}: {id: number}, context: Context) =>
    PostMutation.postUpdate(_, {id, post: {published: false}}, context),
};
