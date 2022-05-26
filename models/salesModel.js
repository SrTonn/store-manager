const connection = require('../db');

const getAll = () => connection.execute(`
  SELECT
    sale_id AS saleId,
    product_id AS productId,
    quantity,
    date
  FROM StoreManager.sales_products sp
  INNER JOIN StoreManager.sales s
  ON sp.sale_id = s.id
`);

const getById = (id) => connection.execute(`
  SELECT
    product_id AS productId,
    quantity,
    date
  FROM StoreManager.sales_products sp
  INNER JOIN StoreManager.sales s
  ON sp.sale_id = s.id
  WHERE sale_id = ?
`, [id]);

module.exports = {
  getAll,
  getById,
};
