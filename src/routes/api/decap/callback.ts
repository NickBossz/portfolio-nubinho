import { createFileRoute } from "@tanstack/react-router";

type GitHubTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

export const Route = createFileRoute("/api/decap/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const result = await handleGitHubCallback(request);

        return new Response(renderLoginScript(result.message, result.content), {
          status: result.status,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Set-Cookie": "decap_oauth_state=; Path=/api/decap; HttpOnly; SameSite=Lax; Max-Age=0; Secure",
          },
        });
      },
    },
  },
});

async function handleGitHubCallback(request: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return errorResult("Missing GitHub OAuth environment variables");
  }

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const storedState = readCookie(request.headers.get("cookie"), "decap_oauth_state");

  if (!code) {
    return errorResult("Missing GitHub OAuth code");
  }

  if (!state || !storedState || state !== storedState) {
    return errorResult("Invalid GitHub OAuth state");
  }

  const callbackUrl = new URL("/api/decap/callback", requestUrl.origin);
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: callbackUrl.toString(),
    }),
  });
  const payload = (await tokenResponse.json()) as GitHubTokenResponse;

  if (!tokenResponse.ok || !payload.access_token) {
    return errorResult(payload.error_description || payload.error || "GitHub OAuth failed");
  }

  return {
    status: 200,
    message: "success",
    content: {
      token: payload.access_token,
      provider: "github",
    },
  };
}

function errorResult(message: string) {
  return {
    status: 400,
    message: "error",
    content: message,
  };
}

function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

function renderLoginScript(message: string, content: unknown) {
  const payload = `authorization:github:${message}:${JSON.stringify(content)}`;

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Autenticando GitHub</title>
  </head>
  <body>
    <script>
      (function () {
        function receiveMessage(event) {
          if (!window.opener || event.source !== window.opener) {
            return;
          }

          window.opener.postMessage(${JSON.stringify(payload)}, event.origin);
        }

        window.addEventListener("message", receiveMessage, false);

        if (window.opener) {
          window.opener.postMessage("authorizing:github", "*");
        }
      })();
    </script>
  </body>
</html>`;
}
