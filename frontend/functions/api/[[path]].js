export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Read backend API URL from Cloudflare Pages Environment Variable "BACKEND_URL"
  // e.g. "https://medcare-backend.onrender.com"
  const backendUrl = context.env.BACKEND_URL;

  if (!backendUrl) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Configuration Error",
        message: "BACKEND_URL environment variable is not configured in Cloudflare Pages."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  // Construct target backend API URL
  const base = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
  const targetUrl = base + url.pathname + url.search;

  try {
    // Construct a proxy request inheriting all headers, body, method, etc. from context.request
    const proxyRequest = new Request(targetUrl, context.request);
    
    // Forward the request to the backend server
    return await fetch(proxyRequest);
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Proxy Connection Error",
        message: `Unable to connect to the backend server at ${base}: ${err.message}`
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
