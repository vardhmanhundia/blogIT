import {User} from "@prisma/client";

export interface SignUpOrSignInPayload {
  credentials: Credentials;
  name?: string;
  bio?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthPayloadType {
  userErrors?: {
    message: string;
  }[];
  token?: string;
}
