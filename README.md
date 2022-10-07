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
