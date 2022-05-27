const express = require('express');
require('express-async-errors');
const middlewares = require('./middlewares');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(express.json());

app.use('/products', require('./routes/products'));
app.use('/sales', require('./routes/sales'));

app.use(middlewares.error);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
