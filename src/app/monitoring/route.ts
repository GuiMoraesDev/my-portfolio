export const dynamic = "force-dynamic";

const SENTRY_INGEST_HOST = "https://o4506790144245760.ingest.us.sentry.io";
const SENTRY_ENVELOPE_HOST_ALLOWLIST = [SENTRY_INGEST_HOST];

export async function POST(request: Request): Promise<Response> {
  const envelope = await request.text();
  const header = envelope.split("\n")[0];

  let dsn: URL;
  try {
    const { dsn: rawDsn } = JSON.parse(header) as { dsn?: string };
    if (!rawDsn) return new Response("Invalid envelope", { status: 400 });
    dsn = new URL(rawDsn);
  } catch {
    return new Response("Invalid envelope header", { status: 400 });
  }

  const upstreamSentryUrl = `${dsn.protocol}//${dsn.host}/api${dsn.pathname}/envelope/`;

  if (
    !SENTRY_ENVELOPE_HOST_ALLOWLIST.some((h) => upstreamSentryUrl.startsWith(h))
  ) {
    return new Response("Disallowed Sentry host", { status: 400 });
  }

  try {
    const response = await fetch(upstreamSentryUrl, {
      method: "POST",
      body: envelope,
    });
    return new Response(null, { status: response.status });
  } catch {
    return new Response("Failed to forward to Sentry", { status: 500 });
  }
}
