const indexHtml = await Bun.file('./index.html').text();

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === '/') {
      return new Response(indexHtml, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    if (url.pathname === '/api/test') {
      return Response.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
      });
    }
    
    return new Response('Not found', { status: 404 });
  },
});

console.log(`Server running on http://localhost:${server.port}`);
