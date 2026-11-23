// Vercel exposes VERCEL_ENV on the server and NEXT_PUBLIC_VERCEL_ENV in the
// browser; both are unset when the site is built outside Vercel.
export const isTrackingEnabled = ({
  nodeEnv = process.env.NODE_ENV,
  vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV,
}: { nodeEnv?: string; vercelEnv?: string } = {}) =>
  nodeEnv === "production" &&
  (vercelEnv === undefined || vercelEnv === "production");
