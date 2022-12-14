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

const addSale = async () => {
  const [row] = await connection.execute(`
    INSERT INTO
      StoreManager.sales
      (date)
    VALUES
      (NOW())
  `);
  return row.insertId;
};

const addSalesProducts = async (id, productId, quantity) => {
  await connection.execute(`
    INSERT INTO
      StoreManager.sales_products
      (sale_id, product_id, quantity)
    VALUES
      (?, ?, ?)
  `, [id, productId, quantity]);
  return { productId, quantity };
};

const updateSale = (id, productId, quantity) => connection.execute(`
  UPDATE
    StoreManager.sales_products
  SET
    product_id = ?, quantity = ?
  WHERE
    sale_id = ?
`, [productId, quantity, id]);

const removeSale = async (id) => {
  connection.execute(`
    DELETE FROM
      StoreManager.sales_products
    WHERE
      sale_id = ?
  `, [id]);

  connection.execute(`
    DELETE FROM
      StoreManager.sales
    WHERE
      id = ?
  `, [id]);
};
module.exports = {
  getAll,
  getById,
  addSale,
  addSalesProducts,
  updateSale,
  removeSale,
};
