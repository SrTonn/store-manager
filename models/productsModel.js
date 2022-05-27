const connection = require('../db');

const getAll = () => connection.execute('SELECT * FROM StoreManager.products');

const getById = (id) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?', [id],
);

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return {
    id: result.insertId,
  };
};

const update = async ({ id, name, quantity }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?',
    [name, quantity, id],
  );

  return result.affectedRows;
};

const remove = (id) => {
  connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
