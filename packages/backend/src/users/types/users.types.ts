import { AuthUser } from "src/auth/types/auth.types";

export interface UserData extends AuthUser {
  avatar_url?: string;
  timezone?: string;
}
