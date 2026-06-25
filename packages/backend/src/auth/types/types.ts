import { Request } from "express";

export interface DecodedUserDetails<T = any> {
  userId: string;
  email: string;
  username: string;
  roles: string[];
  raw: T;
}

export type AuthRequest = Request & {
  user?: DecodedUserDetails;
};
