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
  const isSuccess = message === "success";
  const visibleMessage = isSuccess
    ? "Login autorizado. Voce ja pode voltar para o painel."
    : `Erro no login: ${String(content)}`;

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Autenticando GitHub</title>
    <style>
      body {
        align-items: center;
        background: #090909;
        color: #f5f5f5;
        display: flex;
        font-family: Arial, sans-serif;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        padding: 24px;
        text-align: center;
      }

      main {
        max-width: 420px;
      }

      p {
        color: #b8b8b8;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(visibleMessage)}</h1>
      <p>${isSuccess ? "Se esta janela nao fechar sozinha, volte para a aba do admin." : "Revise as variaveis de ambiente do OAuth na Vercel e tente entrar novamente pelo painel."}</p>
    </main>
    <script>
      (function () {
        var payload = ${JSON.stringify(payload)};
        var attempts = 0;

        function notify(targetOrigin) {
          if (window.opener) {
            window.opener.postMessage(payload, targetOrigin || "*");
          }

          if (window.parent && window.parent !== window) {
            window.parent.postMessage(payload, targetOrigin || "*");
          }
        }

        window.addEventListener("message", function (event) {
          notify(event.origin);
        }, false);

        if (window.opener) {
          window.opener.postMessage("authorizing:github", "*");
        }

        notify("*");

        var interval = window.setInterval(function () {
          attempts += 1;
          notify("*");

          if (attempts >= 20) {
            window.clearInterval(interval);
          }
        }, 500);

        ${isSuccess ? "window.setTimeout(function () { window.close(); }, 1200);" : ""}
      })();
    </script>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
