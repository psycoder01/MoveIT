import ky from "ky";

export const network = ky.create({
  baseUrl: process.env.BUN_PUBLIC_API_BASE_URL,
  prefix: process.env.BUN_PUBLIC_API_VERSION,
  credentials: "include",
  timeout: 10000,
  retry: {
    limit: 4,
  },
});
