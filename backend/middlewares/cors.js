const allowedCors = [
  'localhost:3000',
  'localhost:3001',
  'http://localhost:3000',
  'http://localhost:3001',
  'ozabotkina.nomoredomains.icu',
  'http://ozabotkina.nomoredomains.icu',
  'https://ozabotkina.nomoredomains.icu',
];

// eslint-disable-next-line consistent-return
const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // eslint-disable-next-line no-console

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  res.header('Access-Control-Allow-Credentials', true);

  next();
};

module.exports = cors;
