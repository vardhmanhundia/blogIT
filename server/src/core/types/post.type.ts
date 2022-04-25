import {Post} from "@prisma/client";

export interface PostArgs {
  id?: number;
  post: {title?: string; content?: string; published?: boolean};
}

export interface PostPayloadType {
  userErrors?: {
    message: string;
  }[];
  post?: Post;
}
