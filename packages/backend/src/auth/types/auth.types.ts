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

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  password_hash: string,
  full_name: string;
}