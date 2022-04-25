import JWT from "jsonwebtoken";
const JWT_SIGNATURE: string = process.env.JWT_SIGNATURE || "";

export const AuthUtil = {
  getUserFromToken: (token: string) => {
    try {
      return JWT.verify(token, JWT_SIGNATURE) as {userId: number};
    } catch (err) {
      return null;
    }
  },
};
