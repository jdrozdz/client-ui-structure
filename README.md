# Client UI Structure
#### Example

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Generation self sigined certificate
* via website: [https://regery.com/en/security/ssl-tools/self-signed-certificate-generator](Self signed certificate generator)
* via console (Linux/Unix (including MacOS)
```terminal
$ openssl genrsa -out server.key
$ openssl req -new -key server.key -out server.csr
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.pem
```
Next create directory `dev_keys` and move `server.pem` and `server.key`. Default certificate/key name is `cert.(key|pem)`. If you want to use your's own name, you must change `key` and `cert` parameter value in configuration file (`appsettings.*.json`) file.

### Deprecated packages
* vuelidate-error-extractor v2.4.1 - is no longer supported by Vuejs 3.x

### Reverse PROXY

```javascript
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use(express.static('client'));

// Add middleware for http proxying 
const apiProxy = proxy.createProxyMiddleware('/api', { target: 'http://localhost:8080' });
app.use('/api', apiProxy);

// Render your site
const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
}
app.get('/*', renderIndex);

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
