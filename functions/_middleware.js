export async function onRequest(context) {
  const { request, env, next } = context;

  const expectedUser = env?.BASIC_USER || "jun-arch";
  const expectedPass = env?.BASIC_PASS || "jun-arch2026";

  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return new Response("Authentication Required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Restricted Access"',
      },
    });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Basic") {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const decoded = atob(parts[1]);
    const index = decoded.indexOf(":");
    if (index !== -1) {
      const user = decoded.substring(0, index);
      const pass = decoded.substring(index + 1);

      if (user === expectedUser && pass === expectedPass) {
        return next();
      }
    }
  } catch {
    // Base64デコードエラー時
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Restricted Access"',
    },
  });
}
