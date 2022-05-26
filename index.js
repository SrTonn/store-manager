const app = require('./app');
require('dotenv').config();
require('express-async-errors');
const middlewares = require('./middlewares');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(middlewares.error);
app.use('/products', require('./routes/products'));
app.use('/sales', require('./routes/sales'));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
