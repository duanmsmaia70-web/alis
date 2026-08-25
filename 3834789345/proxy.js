const http = require('http');
const https = require('https');

const UPSTREAMS = {
  activepay: 'https://api.activepay.com.br',
  ironpay: 'https://api.ironpayapp.com.br',
  unipay: 'https://api.fastsoftbrasil.com',
  paguex: 'https://api.paguex.online',
  moonfy: 'https://api.moooonfy.com.br',
  mangofy: 'https://checkout.mangofy.com.br',
  otimize: 'https://api.otimizepagamentos.com',
  sigilopay: 'https://app.sigilopay.com.br/api/v1',
  blackcat: 'https://api.blackcatoficial.com/api'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const segments = url.pathname.replace(/^\/?api\/?/, '').split('/').filter(Boolean);
  const gateway = (segments.shift() || '').toLowerCase();
  const base = UPSTREAMS[gateway];

  if (!base) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Gateway desconhecido', gateway }));
  }

  const path = segments.length ? '/' + segments.join('/') : '/';
  const target = base.replace(/\/+$/, '') + path + url.search;

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.origin;
  delete headers.referer;

  const proxyReq = https.request(target, { method: req.method, headers }, (proxyRes) => {
    const respHeaders = { ...proxyRes.headers };
    delete respHeaders['content-encoding'];
    delete respHeaders['transfer-encoding'];
    delete respHeaders['set-cookie'];
    respHeaders['access-control-allow-origin'] = '*';
    res.writeHead(proxyRes.statusCode, respHeaders);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`[proxy] ${gateway} error:`, err.message);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Falha ao contatar gateway', detail: err.message }));
  });

  if (!['GET', 'HEAD'].includes(req.method)) {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
});

server.listen(3001, () => {
  console.log('[proxy] Local proxy running on http://localhost:3001/api/*');
});
