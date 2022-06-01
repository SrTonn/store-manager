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

describe("Remove uma venda no BD", () => {
  const ID_EXAMPLE = 1;

  before(() => {
    sinon.stub(connection, "execute").resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it("Verifica se retorna \"undefined\"", async () => {
    const response = await SalesModel.removeSale(ID_EXAMPLE);

    expect(response).to.be.undefined;
  });
});

describe("insere uma nova venda no BD", () => {
  const ID_EXAMPLE = 1;
  const productId = 1;
  const quantity = 15;

  before(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("Verifica se retorna um numero", async () => {
      const response = await SalesModel.addSale();

      expect(response).to.be.an("number");
    });

    it("Verifica se o objeto retornado possui as chaves \"id\" e \"quantity\" ", async () => {
      const response = await SalesModel.addSalesProducts(ID_EXAMPLE, productId, quantity);

      expect(response).to.have.all.keys("productId", "quantity");
    });
  });
});

