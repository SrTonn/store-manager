const app = require('./app');
require('dotenv').config();
const middlewares = require('./middlewares');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(middlewares.error);
app.use('/products', require('./routes/products'));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
