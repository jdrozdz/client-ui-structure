/* eslint-disable */

// Only for developing purposes
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const available_env = ['dev', 'uat', 'testing', 'prod'];

const express = require('express');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const spdy = require('spdy');

const server = express();
const env = (process.argv.slice(2))[0];

if (available_env.indexOf(env) < 0 || env === undefined) {
console.error('Unknown environment!');
  console.log('Available environment parameter: ');
  available_env.forEach(x => console.log(' ', x));
  process.kill(process.pid);
}

const configFile = `appsettings.${env}.json`;

if (!fs.existsSync(configFile)) {
  console.error(`Config file '${configFile}' not exist!`);
  process.kill(process.pid);
}

var appSettings = JSON.parse(fs.readFileSync(configFile, 'utf8'));
const apiProxy = proxy.createProxyMiddleware('/api', {target: appSettings.apiUrl});
const serverOptions = {
  key: fs.readFileSync(`${appSettings.serverOptions.basePath}/${appSettings.serverOptions.key}`),
  cert: fs.readFileSync(`${appSettings.serverOptions.basePath}/${appSettings.serverOptions.cert}`),
  requestCert: appSettings.serverOptions.requestCert,
  rejectUnauthorized: appSettings.serverOptions.rejectUnauthorized
};

const url = `https://localhost:${appSettings.port}`;

server.use(cors(appSettings.corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use('/api', apiProxy);
server.use('/', (req, res) => {
  res.json({info: `Proxy server at ${url}`, version: process.version});
});

spdy.createServer(serverOptions, server).listen(appSettings.port, (error) => {
  if (error) {
      console.error(error);
      return process.exit(1);
  } else {
      console.info('HTTP2 supported by server');
      console.info(`Listening on ${url}`);
  }
});

