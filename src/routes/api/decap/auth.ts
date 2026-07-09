import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/decap/auth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
        const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
          return new Response(
            "Missing GitHub OAuth environment variables. Configure GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET in Vercel, then redeploy.",
            { status: 500 },
          );
        }

        const requestUrl = new URL(request.url);
        const scope = requestUrl.searchParams.get("scope") || "repo,user";
        const state = crypto.randomUUID();
        const callbackUrl = new URL("/api/decap/callback", requestUrl.origin);
        const authorizeUrl = new URL("https://github.com/login/oauth/authorize");

        authorizeUrl.searchParams.set("client_id", clientId);
        authorizeUrl.searchParams.set("redirect_uri", callbackUrl.toString());
        authorizeUrl.searchParams.set("scope", scope);
        authorizeUrl.searchParams.set("state", state);

        return new Response(null, {
          status: 302,
          headers: {
            Location: authorizeUrl.toString(),
            "Set-Cookie": makeStateCookie(state, requestUrl.protocol === "https:"),
          },
        });
      },
    },
  },
});

function makeStateCookie(state: string, secure: boolean) {
  const parts = [
    `decap_oauth_state=${state}`,
    "Path=/api/decap",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=600",
  ];

  if (secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}
