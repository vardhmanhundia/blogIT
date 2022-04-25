import validator from "validator";
import {
  AuthPayloadType,
  Context,
  Credentials,
  SignUpOrSignInPayload,
} from "../../core/types";
import bcrypt from "bcryptjs";
import * as JWT from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

export const AuthMutation = {
  signUp: async (
    _: any,
    {credentials, name, bio}: SignUpOrSignInPayload,
    {prisma}: Context
  ): Promise<AuthPayloadType> => {
    const {email, password} = credentials;

    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [{message: "Invalid email"}],
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isValidPassword)
      return {
        userErrors: [{message: "Invalid password"}],
      };

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "Invalid name or bio",
          },
        ],
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {email, password: hashPassword, name},
    });

    await prisma.profile.create({
      data: {
        bio,
        UserId: newUser.id,
      },
    });

    if (!JWT_SIGNATURE)
      return {userErrors: [{message: "Jwt sceret not provided"}]};

    const jwtToken = JWT.sign({userId: newUser.id}, JWT_SIGNATURE, {
      expiresIn: 38000,
    });

    return {
      token: jwtToken,
    };
  },

  signIn: async (
    _: any,
    {credentials}: SignUpOrSignInPayload,
    {prisma}: Context
  ): Promise<AuthPayloadType> => {
    const {email, password} = credentials;

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
      return {
        userErrors: [
          {
            message: "User does not exists",
          },
        ],
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        userErrors: [
          {
            message:
              "The provided username or password is incorrect, please try again!",
          },
        ],
      };
    }

    if (!JWT_SIGNATURE)
      return {userErrors: [{message: "Jwt sceret not provided"}]};

    const token = JWT.sign({userId: user.id}, JWT_SIGNATURE, {
      expiresIn: 38000,
    });

    return {
      token,
    };
  },
};
