const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db");
const SalesModel = require("../../../models/salesModel");

describe("Atualiza uma venda no BD", () => {
  const id = 1;
  const productId = 1;
  const quantity = 15;

  before(() => {
    sinon.stub(connection, "execute").resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Verifica se retorna um array", async () => {
    const response = await SalesModel.updateSale(id, productId, quantity);

    expect(response).to.be.a("array");
  });
});
