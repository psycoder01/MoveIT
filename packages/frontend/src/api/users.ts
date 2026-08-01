import type { User } from "@/types/user";
import { type Response } from "src/types/response";

import { network } from "src/api/network";

const routes = {
  search: "users/search",
};

export const getUserByEmail = async (
  email: string,
): Promise<Response<Pick<User, "id" | "email" | "username" | "full_name">>> => {
  const response = await network.get(routes.search, {
    searchParams: { email },
  });

  return response.json();
};
