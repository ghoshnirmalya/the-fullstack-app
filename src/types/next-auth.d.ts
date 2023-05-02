import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;
type UserEmail = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    email: UserEmail;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}
