import { env } from "@/lib/env.mjs";

export const getApiUrl = (path: string) => {
  console.log(path);

  if (process.env.NODE_ENV === "production") {
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}/${path}`;
  }

  return `http://${env.NEXT_PUBLIC_VERCEL_URL}/${path}`;
};
